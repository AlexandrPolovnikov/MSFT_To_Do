import React from 'react';
import Button from '../../UI/Button';
import { COLOR_TYPES } from '../../../library/constants.enum';
import { date, days, months } from '../../../library/interfaces';

const Task = () => {
    return (
        <div>
            <div className="Information">
                <div className="Information__header">
                    <span>Tasks</span>
                    <span>
                        {days[date.getDay()].toLocaleLowerCase()}, {date.getDate()}{' '}
                        {months[date.getMonth()].toLocaleLowerCase()}
                    </span>
                </div>
                <div className="Information__create"></div>
            </div>
        </div>
    );
};

export default Task;
