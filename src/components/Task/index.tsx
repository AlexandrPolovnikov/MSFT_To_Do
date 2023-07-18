import React from 'react';
import Button from '../Button';
import { COLOR_TYPES } from '../../library/constants.enum';

const Task = ({ active, setActive }: any) => {
    return (
        <div>
            <h1>TASK</h1>
            <Button onClick={() => setActive(false)} type={COLOR_TYPES.danger} text="Закрыть" />
        </div>
    );
};

export default Task;
