import React from 'react';
import './index.scss';
import { useState } from 'react';
import { useDeleteProductMutation, useGetGoodsQuery } from '../../../redux';
import Button from '../../UI/Button';
import { COLOR_TYPES } from '../../../library/constants.enum';
import Options from '../../Options';
import AddTasks from '../../AddTasks';
import Items from '../../Items/Items';
import { date, days, months } from '../../../library/interfaces';

const Planned = () => {
    const [count, setCount] = useState('');
    const [idTask, setIdTask] = useState(0);
    const [nameTask, setNameTask] = useState('');
    const [taskBtn, setTaskBtn] = useState(false);
    const { data = [], isLoading } = useGetGoodsQuery(count);
    const [delProduct] = useDeleteProductMutation();

    const handleTaskBtn = async (id: number, title: string) => {
        setTaskBtn(true);
        setIdTask(id);
        setNameTask(title);
    };

    const handleDeleteProduct = async (id: React.Key | undefined) => {
        await delProduct(id).unwrap();
    };
    if (isLoading) return <h1>Loading...</h1>;
    return (
        <div>
            <div className="Information">
                <div className="Information__header">
                    <span>Все задачи</span>
                    <span>
                        {days[date.getDay()].toLocaleLowerCase()}, {date.getDate()}{' '}
                        {months[date.getMonth()].toLocaleLowerCase()}
                    </span>
                </div>
                <div className="Information__create">
                    <AddTasks />
                </div>

                <div>
                    {data.map((item: { id: number; title: string }) => (
                        <div className="list">
                            <Button
                                onClick={() => handleDeleteProduct(item.id)}
                                text=" 	&#10008;"
                                type={COLOR_TYPES.info}
                            />
                            <div
                                className="list__items"
                                onClick={() => handleTaskBtn(item.id, item.title)}>
                                <Items title={item.title} id={item.id} />
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

export default Planned;
