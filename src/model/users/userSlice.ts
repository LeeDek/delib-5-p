/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable indent */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Agreement, StatementSubscription, User, UserSchema } from "delib-npm";
import { defaultFontSize } from "../fonts/fontsModel";

export enum Status {
  idle = "idle",
  loading = "loading",
  failed = "failed",
}

// Define a type for the slice state
interface UserState {
  user: User | null;
  status: Status;
  askToSubscribeToNotifications: {
    show: boolean;
  };
  memberships: StatementSubscription[];
}
const initialState: UserState = {
  user: null,
  askToSubscribeToNotifications: { show: false },
  status: Status.idle,
  memberships: [],
};

// Async thunk to ban a user and remove their membership
export const banUser = createAsyncThunk(
  "user/banUser",
  async (userId: string, { dispatch }) => {
    console.log(`Dispatching banUser for userId: ${userId}`);
    await banUserFromDB(userId); // Assuming this function updates Firebase or your backend
    dispatch(removeMembershipCard(userId)); // Dispatch removeMembershipCard after banning
  }
);

export const userSlicer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      try {
        if (action.payload) {
          const user = action.payload;
          if (
            !user.fontSize ||
            typeof user.fontSize !== "number" ||
            isNaN(user.fontSize)
          )
            user.fontSize = defaultFontSize;
          UserSchema.parse(action.payload);
          state.user = action.payload;
        } else {
          state.user = null;
        }
      } catch (error) {
        console.error(error);
      }
    },
    showAskNotifications: (state, action: PayloadAction<boolean>) => {
      state.askToSubscribeToNotifications.show = action.payload;
    },
    increaseFontSize: (state, action: PayloadAction<number>) => {
      try {
        if (!state.user) return;
        if (!state.user?.fontSize) state.user.fontSize = defaultFontSize;
        state.user.fontSize += action.payload;
        if (state.user.fontSize < 10) state.user.fontSize = 10;
        if (state.user.fontSize > 30) state.user.fontSize = 30;
      } catch (error) {
        console.error(error);
      }
    },
    setFontSize: (state, action: PayloadAction<number>) => {
      try {
        if (!state.user) return;
        state.user.fontSize = action.payload;
        if (state.user.fontSize < 10) state.user.fontSize = 10;
        if (state.user.fontSize > 30) state.user.fontSize = 30;
      } catch (error) {
        console.error(error);
      }
    },
    updateAgreementToStore: (
      state: UserState,
      action: PayloadAction<Agreement | undefined>
    ) => {
      try {
        if (!state.user) return;
        if (!action.payload) {
          delete state.user.agreement;

          return;
        }
        const agreement = action.payload;
        state.user.agreement = agreement;
      } catch (error) {
        console.error(error);
      }
    },
    removeMembershipCard: (state, action: PayloadAction<string>) => {
      state.memberships = state.memberships.filter(
        (membership) => membership.user.uid !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(banUser.pending, (state) => {
        state.status = Status.loading;
      })
      .addCase(banUser.fulfilled, (state) => {
        state.status = Status.idle;
      })
      .addCase(banUser.rejected, (state) => {
        state.status = Status.failed;
      });
  },
});

export const {
  setUser,
  increaseFontSize,
  setFontSize,
  updateAgreementToStore,
  removeMembershipCard,
} = userSlicer.actions;

export const userSelector = (state: RootState) => state.user.user;
export const statusSelector = (state: RootState) => state.user.status;
export const askToSubscribeToNotificationsSelector = (state: RootState) =>
  state.user.askToSubscribeToNotifications;
export const fontSizeSelector = (state: RootState) =>
  state.user.user?.fontSize || defaultFontSize;

export default userSlicer.reducer;
