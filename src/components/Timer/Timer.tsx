import React, { useEffect, useState } from 'react';
import Button from '../Button';
import './index.scss';
import { COLOR_TYPES } from '../../library/constants.enum';
import AddTasks from '../AddTasks/index';
import { useGetGoodsQuery, useSubTasksMutation } from '../../redux';
import { dateNow } from '../../library/interfaces';

const Timer = ({ id }: any) => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [addTimer] = useSubTasksMutation();

    const handleAddTimer = async () => {
        setIsActive(!isActive);

        await addTimer({
            id: id,
            timer: {
                seconds: seconds,
                minutes: minutes,
                hours: hours,
            },
        }).unwrap();
    };

    function toggle() {
        setIsActive(!isActive);
    }

    function reset() {
        setSeconds(0);
        setMinutes(0);
        setHours(0);
        setIsActive(false);
    }

    useEffect(() => {
        let interval: number | NodeJS.Timeout | undefined;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds((seconds) => seconds + 1);
                if (seconds === 59) {
                    setMinutes((minutes) => minutes + 1);
                    setSeconds(0);
                }
                if (minutes === 59) {
                    setHours((hours) => hours + 1);
                    setMinutes(0);
                }
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    return (
        <div className="Timer">
            <div className="Timer__value">
                {hours}: {minutes}: {seconds}
            </div>
            <div className="Timer__btn">
                <Button
                    className={`button button-primary button-primary-${
                        isActive ? 'active' : 'inactive'
                    }`}
                    onClick={handleAddTimer}
                    text={isActive ? 'Pause' : 'Start'}
                    type={COLOR_TYPES.info}
                />
                <Button
                    text="Reset"
                    type={COLOR_TYPES.info}
                    onClick={reset}
                    className="button button-primary"
                />
            </div>
        </div>
    );
};
export default Timer;
