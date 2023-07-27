import React, { useState } from 'react';
import './index.scss';
import Button from '../Button';
import { COLOR_TYPES } from '../../library/constants.enum';
import { useAddCommitMutation } from '../../redux';
import Timer from '../Timer/Timer';
import Input from '../Input';
import { date } from '../../library/interfaces';

const Options = ({ active, setActive, idTask, data }: any) => {
    const [updateProduct, setUpdateProduct] = useState<string>('');
    const [updateTasks, setUpdateTasks] = useState<string>('');

    const [addTask] = useAddCommitMutation();

    const handleAddTask = async (item: { id: number; name: string; date?: string }) => {
        if (updateProduct) {
            await addTask({
                id: item.id,
                name: updateProduct,
                date: date,
                body: {
                    id: item.id,
                    name: updateTasks,
                },
            }).unwrap();
            setUpdateTasks('');
            setUpdateProduct('');
        }
    };

    const handleValue = async (name: string) => {
        setUpdateProduct(name);
        setUpdateTasks(name);
    };

    return (
        <div className={active ? 'right active' : 'right'} onClick={(e) => e.stopPropagation()}>
            {data
                .filter((item: { id: number; name: string; date?: string }) => item.id === idTask)
                .map((item: { id: number; name: string; date?: string }) => (
                    <div className="right__content" key={item.id}>
                        <textarea
                            value={updateProduct}
                            placeholder={item.name}
                            onClick={() => handleValue(item.name)}
                            onChange={(e) => setUpdateProduct(e.target.value)}></textarea>
                        <Button
                            onClick={() => handleAddTask(item)}
                            type={COLOR_TYPES.info}
                            text="Обновить"
                        />
                    </div>
                ))}

            <Input />
            <div>
                <Timer />
            </div>
            <Button onClick={() => setActive(false)} type={COLOR_TYPES.info} text="Закрыть" />
        </div>
    );
};

export default Options;
