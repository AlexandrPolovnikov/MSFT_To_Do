import React, { useState } from 'react';
import Button from '../Button';
import { COLOR_TYPES } from '../../library/constants.enum';

const Timer = () => {
    const [paused, setPaused] = React.useState(false);
    const [over, setOver] = React.useState(false);
    const [[hours, minutes, seconds], setTime] = React.useState<number[]>([0, 0, 0]);

    const tick = () => {
        if (paused || over) return;

        if (hours === 0 && minutes === 0 && seconds === 0) {
            setOver(true);
        } else if (minutes === 0 && seconds === 0) {
            setTime([hours - 1, 59, 59]);
        } else if (seconds === 0) {
            setTime([hours, minutes - 1, 59]);
        } else {
            setTime([hours, minutes, seconds - 1]);
        }
    };

    const reset = () => {
        setTime([0, 0, 0]);
        setPaused(false);
        setOver(false);
    };

    React.useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
        return () => clearInterval(timerID);
    });

    return (
        <div>
            <p>{`${hours.toString().padStart(2, '0')}:${minutes
                .toString()
                .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</p>
            <div>{over ? "Time's up!" : ''}</div>
            {/* <button onClick={() => setPaused(!paused)}>{paused ? 'Resume' : 'Pause'}</button>
            <button onClick={() => reset()}>Restart</button> */}
            <Button
                onClick={() => setPaused(!paused)}
                text={paused ? 'Resume' : 'Pause'}
                type={COLOR_TYPES.info}
            />
            <Button onClick={() => reset()} text="Restart" type={COLOR_TYPES.info} />
        </div>
    );
};

export default Timer;
