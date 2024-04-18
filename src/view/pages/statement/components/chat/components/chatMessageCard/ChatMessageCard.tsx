import { FC, useState } from "react";

// Third Party Imports
import { Statement, StatementType, User } from "delib-npm";

// Redux Store
import { useAppSelector } from "../../../../../../../functions/hooks/reduxHooks";
import { statementSubscriptionSelector } from "../../../../../../../model/statements/statementsSlice";
import { store } from "../../../../../../../model/store";

// Helper functions
import {
    isAuthorized,
    isOptionFn,
    linkToChildren,
} from "../../../../../../../functions/general/helpers";

// Hooks
import useStatementColor from "../../../../../../../functions/hooks/useStatementColor";

// Custom Components
import EditTitle from "../../../../../../components/edit/EditTitle";
import ProfileImage from "../ProfileImage";
import StatementChatMore from "../StatementChatMore";

// import Evaluation from "../../../../../components/evaluation/simpleEvaluation/SimplEvaluation";
import AddQuestionIcon from "../../../../../../../assets/icons/addQuestion.svg?react";
import EditIcon from "../../../../../../../assets/icons/editIcon.svg?react";
import LightBulbIcon from "../../../../../../../assets/icons/lightBulbIcon.svg?react";
import QuestionMarkIcon from "../../../../../../../assets/icons/questionIcon.svg?react";
import {
    setStatementisOption,
    updateIsQuestion,
} from "../../../../../../../functions/db/statements/setStatments";
import { useLanguage } from "../../../../../../../functions/hooks/useLanguages";
import Menu from "../../../../../../components/menu/Menu";
import MenuOption from "../../../../../../components/menu/MenuOption";
import Modal from "../../../../../../components/modal/Modal";
import NewSetStatementSimple from "../../../set/NewStatementSimple";
import "./ChatMessageCard.scss";

export interface NewQuestion {
    statement: Statement;
    isOption: boolean;
    showModal: boolean;
}

interface ChatMessageCardProps {
    parentStatement: Statement;
    statement: Statement;
    showImage: (statement: User | null) => void;
    index: number;
    previousStatement: Statement | undefined;
}

const ChatMessageCard: FC<ChatMessageCardProps> = ({
    parentStatement,
    statement,
    showImage,
    previousStatement,
}) => {
    // Hooks
    const { statementType } = statement;
    const statementColor = useStatementColor(statementType || "");
    const { t, dir } = useLanguage();

    // Redux store
    const userId = store.getState().user.user?.uid;
    const statementSubscription = useAppSelector(
        statementSubscriptionSelector(statement.parentId),
    );

    // Use States
    const [isEdit, setIsEdit] = useState(false);
    const [isNewStatementModalOpen, setIsNewStatementModalOpen] =
        useState(false);
    const [isCardMenuOpen, setIsCardMenuOpen] = useState(false);

    // Variables
    const creatorId = statement.creatorId;
    const _isAuthorized = isAuthorized(
        statement,
        statementSubscription,
        parentStatement.creatorId,
    );

    const isMe = userId === creatorId;
    const isQuestion = statementType === StatementType.question;
    const isOption = isOptionFn(statement);

    const shouldLinkToChildStatements =
        (isQuestion || isOption) && parentStatement.hasChildren;

    const isPreviousFromSameAuthor = previousStatement?.creatorId === creatorId;

    const isAlignedLeft = (isMe && dir === "ltr") || (!isMe && dir === "rtl");

    function handleSetOption() {
        try {
            if (statement.statementType === "option") {
                const cancelOption = window.confirm(
                    "Are you sure you want to cancel this option?",
                );
                if (cancelOption) {
                    setStatementisOption(statement);
                }
            } else {
                setStatementisOption(statement);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div
            className={`chat-message-card ${isAlignedLeft && "aligned-left"} ${dir}`}
        >
            {!isPreviousFromSameAuthor && (
                <div className="user">
                    <ProfileImage statement={statement} showImage={showImage} />
                    <span>{statement.creator.displayName}</span>
                </div>
            )}

            <div
                className="message-box"
                style={{ borderColor: statementColor.backgroundColor }}
            >
                {!isPreviousFromSameAuthor && <div className="triangle" />}

                <div className="info">
                    <div className="info-text">
                        <EditTitle
                            statement={statement}
                            isEdit={isEdit}
                            setEdit={setIsEdit}
                            isTextArea={true}
                        />
                    </div>

                    <Menu
                        setIsOpen={setIsCardMenuOpen}
                        isMenuOpen={isCardMenuOpen}
                        iconColor="#5899E0"
                    >
                        {_isAuthorized && (
                            <MenuOption
                                label={t("Edit Text")}
                                icon={<EditIcon style={{ color: "#226CBC" }} />}
                                onOptionClick={() => setIsEdit(!isEdit)}
                            />
                        )}
                        {!isOptionFn(statement) && (
                            <MenuOption
                                isOptionSelected={isQuestion}
                                label={t("Question")}
                                icon={<QuestionMarkIcon />}
                                onOptionClick={() =>
                                    updateIsQuestion(statement)
                                }
                            />
                        )}
                        {linkToChildren(statement, parentStatement) && (
                            <MenuOption
                                label={t("Add Question")}
                                icon={<AddQuestionIcon />}
                                onOptionClick={() =>
                                    setIsNewStatementModalOpen(true)
                                }
                            />
                        )}
                        {_isAuthorized && !isQuestion && (
                            <MenuOption
                                isOptionSelected={isOptionFn(statement)}
                                icon={<LightBulbIcon />}
                                label={t("Option")}
                                onOptionClick={handleSetOption}
                            />
                        )}
                    </Menu>
                </div>

                {shouldLinkToChildStatements && (
                    <StatementChatMore statement={statement} />
                )}

                {/* <div className="actions">
                    <div className="actions-type"></div>
                     <div className="evaluations">
                        <Evaluation
                            statement={statement}
                            displayScore={false}
                        />
                    </div> 
                </div>*/}
            </div>
            {isNewStatementModalOpen && (
                <Modal>
                    <NewSetStatementSimple
                        parentStatement={statement}
                        isOption={false}
                        setShowModal={setIsNewStatementModalOpen}
                    />
                </Modal>
            )}
        </div>
    );
};

export default ChatMessageCard;
