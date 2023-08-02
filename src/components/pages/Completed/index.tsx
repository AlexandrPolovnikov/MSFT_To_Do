import React from 'react';
import { days, date, months } from '../../../library/interfaces';

const Completed = () => {
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

export default Completed;
