import React, { useState } from 'react';
import './index.scss';
import Button from '../UI/Button';
import { COLOR_TYPES } from '../../library/constants.enum';
import { useSubTasksMutation } from '../../redux';
import Timer from '../Timer/Timer';
import Input from '../UI/Input';
import axios from 'axios';
import qs from 'qs';

const Options = ({ active, setActive, idTask, data }: any) => {
    const [updateProduct, setUpdateProduct] = useState<string>('');
    const [updateTasks, setUpdateTasks] = useState<string>('');
    const [addSubTask] = useSubTasksMutation();

    // const datas = { bar: 123 };
    // const options = {
    //     method: 'PATCH',
    //     headers: { 'content-type': 'application/x-www-form-urlencoded' },
    //     data: qs.stringify(data),
    //     url: `https://64ccc0ee2eafdcdc851a3d73.mockapi.io/${idTask}`,
    // };
    // axios(options);

    const handleSubTasks = async (item: { id: number; title: string; date?: string }) => {
        await addSubTask({
            id: idTask,
            name: updateProduct,
            tasks: updateTasks,
        }).unwrap();
        setUpdateProduct('');
        setUpdateTasks('');
    };

    const handleValue = async (title: string) => {
        setUpdateProduct(title);
    };

    return (
        <div className={active ? 'right active' : 'right'} onClick={(e) => e.stopPropagation()}>
            {data
                .filter(
                    (item: { id: number; title: string; tasks?: string; timer?: number }) =>
                        item.id === idTask,
                )
                .map((item: { id: number; title: string; tasks?: string; timer?: number }) => (
                    <div className="right__content" key={item.id}>
                        <textarea
                            value={updateProduct}
                            placeholder={item.title}
                            onClick={() => handleValue(item.title)}
                            onChange={(e) => setUpdateProduct(e.target.value)}></textarea>
                        <textarea
                            value={updateTasks}
                            placeholder="Добавить задачу?"
                            // onClick={() => handleValue(item.name)}
                            onChange={(e) => setUpdateTasks(e.target.value)}></textarea>
                        <div>{item.tasks}</div>
                        <Button
                            onClick={() => handleSubTasks(item)}
                            type={COLOR_TYPES.info}
                            text="Обновить"
                        />
                        <Timer id={item.id} timer={item.timer} />
                    </div>
                ))}

            <div></div>
            <Button onClick={() => setActive(false)} type={COLOR_TYPES.info} text="Закрыть" />
        </div>
    );
};

export default Options;
