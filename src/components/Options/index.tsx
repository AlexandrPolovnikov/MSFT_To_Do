import React, { useState } from 'react';
import './index.scss';
import Button from '../Button';
import { COLOR_TYPES } from '../../library/constants.enum';
import { useEditProductMutation } from '../../redux';
import Timer from '../Timer/Timer';

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
        <div className={active ? 'right active' : 'right'} onClick={(e) => e.stopPropagation()}>
            <Button onClick={() => setActive(false)} type={COLOR_TYPES.info} text="Закрыть" />

            {data
                .filter((item: { id: number; name: number }) => item.id === idTask)
                .map((item: { id: number; name: string }) => (
                    <div className="right__content" key={item.id}>
                        <textarea
                            value={updateProduct}
                            placeholder={item.name}
                            onClick={() => handleValue(item.name)}
                            onChange={(e) => setUpdateProduct(e.target.value)}></textarea>
                        <Button
                            onClick={() => handleUpdateProd(item.id, item.name)}
                            type={COLOR_TYPES.info}
                            text="Обновить"
                        />
                    </div>
                ))}
            <div>
                <Timer />
            </div>
        </div>
    );
};

export default Options;
