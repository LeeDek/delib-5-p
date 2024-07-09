/* eslint-disable no-console */
import { Role, StatementSubscription } from "delib-npm";
import { FC } from "react";
import styles from "./MembershipCard.module.scss";

//icons
import MemberAdmin from "../../../../../../../../assets/icons/memberAdmin.svg?react";
import MemberRemove from "../../../../../../../../assets/icons/memberRemove.svg?react";
import { setRoleToDB } from "../../../../../../../../controllers/db/subscriptions/setSubscriptions";
import { useAppDispatch, useAppSelector } from "../../../../../../../../controllers/hooks/reduxHooks";
import { banUser, userSelector, removeMembershipCard } from "../../../../../../../../model/users/userSlice";

interface Props {
	member: StatementSubscription;
}

const MembershipCard: FC<Props> = ({ member }) => {
	const firstLetter = member.user.displayName.charAt(0).toUpperCase();
	const displayImg = member.user.photoURL;
	const role = member.role;
	const user = useAppSelector(userSelector);
	const dispatch = useAppDispatch();

	if (member.userId === user?.uid) return null;

	function handleSetRole() {
		if (role === Role.admin) {
			setRoleToDB(member.statement, Role.member, member.user);
		} else {
			setRoleToDB(member.statement, Role.admin, member.user);
		}
	}

	const handleRemoveUser = async () => {
		console.log("Remove user clicked");
		try {
			await dispatch(banUser(member.userId));
			dispatch(removeMembershipCard(member.userId));
			document.body.style.backgroundColor = 'red';
		} catch (error) {
			console.error("Failed to remove user: ", error);
		}
	};

	return (
		<div className={styles.card}>
			<div className={styles.card__info}>
				<div
					className={styles.card__info__img}
					style={{ backgroundImage: `url(${displayImg})` }}
				>
					{!displayImg && firstLetter}
				</div>
				<div className={styles.card__info__name}>{member.user.displayName}</div>
			</div>
			<div className={styles.card__membership}>
				<div
					onClick={handleSetRole}
					className={
						role === Role.admin
							? styles["card__membership--admin"]
							: styles["card__membership--member"]
					}
				>
					<MemberAdmin />
				</div>
				<div className={styles.card__membership__svg} onClick={handleRemoveUser}>
					<MemberRemove />
				</div>
			</div>
		</div>
	);
};

export default MembershipCard;
