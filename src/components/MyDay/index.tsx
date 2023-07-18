import React from 'react';
import './index.scss';
import { useState } from 'react';
import { useDeleteProductMutation, useEditProductMutation, useGetGoodsQuery } from '../../redux';
import Button from '../Button';
import Modal from '../Modal/Modal';
import { COLOR_TYPES } from '../../library/constants.enum';
import Options from '../Options';
import AddTasks from '../AddTasks';

const MyDay = () => {
    const [count, setCount] = useState('');
    const [idTask, setIdTask] = useState(0);
    const [nameTask, setNameTask] = useState('');
    const [taskBtn, setTaskBtn] = useState(false);
    const [modalActive, setModalActive] = useState(false);
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
        <div className={taskBtn ? 'main active' : 'main'}>
            <div className="Information">
                <div className="Information__header">
                    <span>My Day</span>
                </div>
                <ul>
                    {data.map((item: { id: number; name: string }) => (
                        <div className="Information__list">
                            <li
                                className="Information__items"
                                key={item.id}
                                onClick={() => handleTaskBtn(item.id, item.name)}>
                                <span> {item.name}</span>
                            </li>
                            <Button
                                onClick={() => handleDeleteProduct(item.id)}
                                text=" 	&#10008;"
                                type={COLOR_TYPES.danger}
                            />
                        </div>
                    ))}
                </ul>
                <div className="Footer">
                    <AddTasks />
                </div>
            </div>
            <div>
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
