import React, { useState } from 'react';
import './index.scss';
import Button from '../Button';
import { COLOR_TYPES } from '../../library/constants.enum';
import { useEditProductMutation } from '../../redux';
import Input from '../Input';

const Options = ({ active, setActive, idTask, data }: any) => {
    const [updateProduct, setUpdateProduct] = useState<string>('');

    const [editProd, { isError }] = useEditProductMutation();

    const handleUpdateProd = async (id: number, name: string) => {
        if (updateProduct) {
            await editProd({
                id: id,
                name: updateProduct,
            }).unwrap();
            setUpdateProduct('');
        }
    };

    const handleValue = async (name: string) => {
        setUpdateProduct(name);
    };

    return (
        <div className={active ? 'right active' : 'right'}>
            <div className="right__content" onClick={(e) => e.stopPropagation()}>
                <div>
                    {data
                        .filter((item: { id: number; name: number }) => item.id === idTask)
                        .map((item: { id: number; name: string }) => (
                            <div className="right__content__items" key={item.id}>
                                <span> {item.name}</span>
                                <Input
                                    value={updateProduct}
                                    type="text"
                                    placeholder={item.name}
                                    onClick={() => handleValue(item.name)}
                                    onChange={(e) => setUpdateProduct(e.target.value)}
                                />
                                <Button
                                    onClick={() => handleUpdateProd(item.id, item.name)}
                                    type={COLOR_TYPES.info}
                                    text="Обновить"
                                />
                            </div>
                        ))}
                </div>
            </div>
            <Button onClick={() => setActive(false)} type={COLOR_TYPES.danger} text="Закрыть" />
        </div>
    );
};

export default Options;
