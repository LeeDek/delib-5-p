import React, { MouseEventHandler, ReactNode } from "react";
import EllipsisIcon from "../../../assets/icons/ellipsisIcon.svg?react";
import "./popUpStyle.scss";
import QuestionMarkIcon from "../icons/QuestionMarkIcon";
import { useLanguage } from "../../../functions/hooks/useLanguages";
import IconButton from "../iconButton/IconButton";

interface Props {
    isAuthrized?: boolean;
    unAuthrizedIcon?: JSX.Element;
    openMoreIconColor: string;
    firstIcon: JSX.Element;
    firstIconFunc?: MouseEventHandler<HTMLSpanElement>;
    firstIconText: string;
    secondIcon?: JSX.Element;
    secondIconFunc?: MouseEventHandler<HTMLSpanElement>;
    secondIconText?: string;
    thirdIcon?: JSX.Element;
    thirdIconFunc?: any; // MouseEventHandler<HTMLSpanElement>;
    thirdIconText?: string;
    fourthIcon?: JSX.Element;
    fourthIconFunc?: MouseEventHandler<HTMLSpanElement>;
    fourthIconText?: string;
    children: ReactNode; // Update the type of children
    isMe: boolean; // Add isMe prop
}

const PopUpMenu: React.FC<Props> = ({
    isAuthrized = true,
    openMoreIconColor,
    unAuthrizedIcon = <QuestionMarkIcon color={openMoreIconColor} />,
    firstIcon,
    firstIconFunc,
    firstIconText,
    secondIcon,
    secondIconFunc,
    secondIconText,
    thirdIcon,
    thirdIconFunc,
    thirdIconText,
    fourthIcon,
    fourthIconFunc,
    fourthIconText,
    children,
    isMe,
}) => {
    const [openMore, setOpenMore] = React.useState(false);
    const { t } = useLanguage();

    return isAuthrized ? (
        <div
            className="moreIconBox"
            onClick={() => setOpenMore((prev) => !prev)}
        >
            <IconButton>
                <EllipsisIcon style={{ color: openMoreIconColor }} />
            </IconButton>
            {openMore && (
                <>
                    <div className="invisibleBackground"></div>
                    <div className="moreIconBox__menu">
                        <span
                            className="moreIconBox__menu__item"
                            onClick={firstIconFunc}
                        >
                            {firstIcon}
                            {t(firstIconText)}
                        </span>
                        <span
                            className="moreIconBox__menu__item"
                            onClick={secondIconFunc}
                        >
                            {secondIcon}
                            {t(secondIconText || "")}
                        </span>
                        <span
                            className="moreIconBox__menu__item"
                            onClick={thirdIconFunc}
                        >
                            {thirdIcon}
                            {t(thirdIconText || "")}
                        </span>
                        <span
                            className="moreIconBox__menu__item"
                            onClick={fourthIconFunc}
                        >
                            {fourthIcon}
                            {t(fourthIconText || "")}
                        </span>
                        {children}
                    </div>
                </>
            )}
        </div>
    ) : (
        unAuthrizedIcon
    );
};

export default PopUpMenu;
