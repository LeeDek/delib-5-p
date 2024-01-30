import { useEffect, useState } from "react";

// Style
import "./timerPage.scss";

import TimerIcon from "./timerIcon/TimerIcon";
import PlayIcon from "../../../../../components/icons/PlayIcon";
import PauseIcon from "../../../../../components/icons/PauseIcon";
import StopIcon from "../../../../../components/icons/StopIcon";
import { getMinutesAndSeconds } from "./timerPagecont";
import { RoomTimer, Statement, TimerStatus } from "delib-npm";
import { setTimersStateDB } from "../../../../../../functions/db/timer/setTimer";
import { store } from "../../../../../../model/store";

interface Props {
    statement: Statement;
    roomNumber: number;
    timerId: number;
    timers: RoomTimer | null;
    title: string;
    activeTimer: boolean;
    nextTimer: Function;
    initTime: number;
    autoStart?: boolean;
    lastTimer?: boolean;
}

export default function Timer({
    statement,
    roomNumber,
    timerId,
    timers,
    title,
    activeTimer,
    nextTimer,
    initTime,
    autoStart,
    lastTimer,
}: Props): JSX.Element {
    const userId = store.getState().user.user?.uid;
    // useState
    const [timeLeft, setTimeLeft] = useState(initTime);
    const [minutes, setMinutes] = useState(
        getMinutesAndSeconds(initTime).minutes,
    );
    const [seconds, setSeconds] = useState(
        getMinutesAndSeconds(initTime).seconds,
    );
    const [isActive, setIsActive] = useState(false);
    const [timer, setTimer] = useState<NodeJS.Timer>();
    const isMasterTimer =
        timers?.initiatorId === userId || timers?.state === TimerStatus.finish;
 

    const percent = (timeLeft / initTime) * 100;

    const interval = () =>
        setInterval(() => {
            setTimeLeft((prev) => {
                const newTime = prev - 1000;
                if (newTime < 0) {
                    setIsActive(false);
                    initilizeTimer();
                    nextTimer();
                    clearInterval(timer);
                    if (lastTimer) updateTimerState(TimerStatus.finish);

                    return 0;
                }

                setMinutes(getMinutesAndSeconds(newTime).minutes);
                setSeconds(getMinutesAndSeconds(newTime).seconds);

                return newTime;
            });
        }, 1000);

    useEffect(() => {
        if (isActive) {
            setTimer(interval());
        } else {
            clearInterval(timer);
        }

        return () => {
            clearInterval(interval());
        };
    }, [isActive]);

    useEffect(() => {
        if (autoStart && activeTimer) {
            setTimeout(() => {
                startTimer();
            }, 1000);
        }
    }, [activeTimer]);

    useEffect(() => {
        if (
            timers?.state === TimerStatus.start &&
            !isActive &&
            timers?.activeTimer === timerId 
            && !isMasterTimer
        ) {
            console.log(`start timer ${timerId} - Active: ${timers?.activeTimer} - Master: ${isMasterTimer}`)
            startTimer();
        } else if (timers?.state === TimerStatus.pause){
            pauseTimer();
        }else if(timers?.state === TimerStatus.finish){
            stopAndResetTimer();
        }
    }, [timers?.state]);

    const stopAndResetTimer = () => {
        setIsActive(false);
        setTimeLeft(initTime);
        setMinutes(getMinutesAndSeconds(initTime).minutes);
        setSeconds(getMinutesAndSeconds(initTime).seconds);

        updateTimerState(TimerStatus.finish);
    };
    const startTimer = (): void => {
        setIsActive(true);

        //send a message to the server that the timer has started
        updateTimerState(TimerStatus.start);
    };

    const pauseTimer = ()=> {
        setIsActive(false);
        updateTimerState(TimerStatus.pause);
    };

    function initilizeTimer() {
        setMinutes(getMinutesAndSeconds(initTime).minutes);
        setSeconds(getMinutesAndSeconds(initTime).seconds);
        setTimeLeft(initTime);
        updateTimerState(TimerStatus.finish);
    }

    return (
        <div className="roomsWrapper">
            <div className="roomsWrapper__timer">
                <h2>{title}</h2>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "2rem",
                    }}
                >
                    <TimerIcon percent={percent} />
                </div>
                <p className="roomsWrapper__timer__time">{`${
                    minutes < 10 ? "0" + minutes : minutes
                }:${seconds < 10 ? "0" + seconds : seconds}`}</p>

                <div
                    style={{
                        opacity: activeTimer && isMasterTimer ? `1` : `.2`,
                    }}
                >
                    {!isActive && (
                        <PlayIcon
                            onClick={() => {
                                if (activeTimer && isMasterTimer) startTimer();
                            }}
                        />
                    )}
                    {isActive && (
                        <div className="roomsWrapper__timer__time__actions">
                            <StopIcon
                                onClick={() => {
                                    if (activeTimer && isMasterTimer)
                                        stopAndResetTimer();
                                }}
                            />
                            <PauseIcon
                                onClick={() => {
                                    if (activeTimer && isMasterTimer)
                                    pauseTimer();
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    function updateTimerState(newState: TimerStatus) {
        try {
            if (isMasterTimer) {
                setTimersStateDB({
                    statementId: statement.statementId,
                    roomNumber,
                    timerId,
                    state: newState,
                });
            }
        } catch (error) {
            console.error(error);
        }
    }
}
