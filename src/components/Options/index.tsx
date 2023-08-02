import React, { useState } from 'react';
import './index.scss';
import Button from '../UI/Button';
import { COLOR_TYPES } from '../../library/constants.enum';
import { useSubTasksMutation } from '../../redux';
import Timer from '../Timer/Timer';
import Input from '../UI/Input';

const Options = ({ active, setActive, idTask, data }: any) => {
    const [updateProduct, setUpdateProduct] = useState<string>('');
    const [updateTasks, setUpdateTasks] = useState<string>('');
    const [addSubTask] = useSubTasksMutation();

    const handleSubTasks = async (item: { id: number; name: string; date?: string }) => {
        await addSubTask({
            id: idTask,
            name: updateProduct,
            tasks: updateTasks,
        }).unwrap();
        setUpdateProduct('');
        setUpdateTasks('');
    };

    const handleValue = async (name: string) => {
        setUpdateProduct(name);
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
                        <textarea
                            value={updateTasks}
                            placeholder="Добавить задачу?"
                            // onClick={() => handleValue(item.name)}
                            onChange={(e) => setUpdateTasks(e.target.value)}></textarea>
                        <Input />
                        <Button
                            onClick={() => handleSubTasks(item)}
                            type={COLOR_TYPES.info}
                            text="Обновить"
                        />
                        <Timer id={item.id} />
                    </div>
                ))}

            <div></div>
            <Button onClick={() => setActive(false)} type={COLOR_TYPES.info} text="Закрыть" />
        </div>
    );
};

export default Options;
