import React from 'react';
import './index.scss';
import { useState } from 'react';
import { useDeleteProductMutation, useGetGoodsQuery } from '../../../redux';
import Button from '../../UI/Button';
import { COLOR_TYPES } from '../../../library/constants.enum';
import Options from '../../Options';
import AddTasks from '../../AddTasks';
import Items from '../../Items/Items';
import { date, dateNow, days, months } from '../../../library/interfaces';
import { usePosts } from '../../../hooks/useFilters';
import Input from '../../UI/Input';

const MyDay = () => {
    const [count, setCount] = useState('');
    const [idTask, setIdTask] = useState(0);
    const [nameTask, setNameTask] = useState('');
    const [taskBtn, setTaskBtn] = useState(false);
    const { data = [], isLoading } = useGetGoodsQuery(count);
    const [delProduct] = useDeleteProductMutation();
    const [filter, setFilter] = useState({ sort: '', query: '' });
    const sortedAndSearchedPosts = usePosts(data, filter.sort, filter.query);

    const handleTaskBtn = async (id: number, title: string) => {
        setTaskBtn(true);
        setIdTask(id);
        setNameTask(title);
    };

    const btnProp = (event: string) => {
        setFilter({ ...filter, sort: event });
    };

    const handleDeleteProduct = async (id: React.Key | undefined) => {
        await delProduct(id).unwrap();
    };
    if (isLoading) return <h1>Loading...</h1>;
    return (
        <div>
            <div className="Information">
                <div className="Information__header">
                    <div className="Information__header-date">
                        <span>Мой день</span>
                        <span>
                            {days[date.getDay()].toLocaleLowerCase()}, {date.getDate()}{' '}
                            {months[date.getMonth()].toLocaleLowerCase()}
                        </span>
                    </div>
                    <div className="Information__header-btn">
                        <Button text="По id" type={COLOR_TYPES.info} onClick={() => btnProp('')} />
                        <Button
                            text="По названию"
                            type={COLOR_TYPES.info}
                            onClick={() => btnProp('title')}
                        />
                    </div>
                </div>
                <div className="Information__create">
                    <AddTasks />
                </div>

                <div>
                    {sortedAndSearchedPosts
                        .filter(
                            (item: { id: number; title: string; date?: string }) =>
                                item.date === dateNow,
                        )
                        .map((item: { id: number; title: string }) => (
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
            {/* <div>
                <Input
                    value={filter.query}
                    onChange={(e) => setFilter({ ...filter, query: e.target.value })}
                    placeholder="   Поиск"
                />
            </div> */}
            <div className={taskBtn ? 'main active' : 'main'} onClick={(e) => e.stopPropagation()}>
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
