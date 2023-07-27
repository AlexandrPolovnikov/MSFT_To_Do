import React from 'react';
import './index.scss';
import { useState } from 'react';
import { useDeleteProductMutation, useGetGoodsQuery } from '../../redux';
import Button from '../Button';
import { COLOR_TYPES } from '../../library/constants.enum';
import Options from '../Options';
import AddTasks from '../AddTasks';
import Menu from '../Button/icons/Menu';
import Items from '../Items/Items';
import { date, dateNow, days, months } from '../../library/interfaces';
import Completed from '../Completed';

const MyDay = () => {
    const [count, setCount] = useState('');
    const [idTask, setIdTask] = useState(0);
    const [nameTask, setNameTask] = useState('');
    const [taskBtn, setTaskBtn] = useState(false);
    const { data = [], isLoading } = useGetGoodsQuery(count);
    const [delProduct] = useDeleteProductMutation();

    const handleTaskBtn = async (id: number, name: string) => {
        setTaskBtn(true);
        setIdTask(id);
        setNameTask(name);
    };

    const handleDeleteProduct = async (id: React.Key | undefined) => {
        await delProduct(id).unwrap();
    };
    if (isLoading) return <h1>Loading...</h1>;
    return (
        <div>
            <div className="Information">
                <div className="Information__header">
                    <span>
                        <Menu /> Мой день
                    </span>
                    <span>
                        {days[date.getDay()].toLocaleLowerCase()}, {date.getDate()}{' '}
                        {months[date.getMonth()].toLocaleLowerCase()}
                    </span>
                </div>
                <div className="Information__create">
                    <AddTasks />
                </div>

                <div>
                    {data
                        .filter(
                            (item: { id: number; name: string; date?: string }) =>
                                item.date === dateNow,
                        )
                        .map((item: { id: number; name: string }) => (
                            <div className="list">
                                <Button
                                    onClick={() => handleDeleteProduct(item.id)}
                                    text=" 	&#10008;"
                                    type={COLOR_TYPES.info}
                                />
                                <div
                                    className="list__items"
                                    onClick={() => handleTaskBtn(item.id, item.name)}>
                                    <Items name={item.name} id={item.id} />
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <div className={taskBtn ? 'main active' : 'main'}>
                <Options
                    data={data}
                    nameTask={nameTask}
                    idTask={idTask}
                    active={taskBtn}
                    setActive={setTaskBtn}
                />
            </div>
        </div>
    );
};

export default MyDay;
