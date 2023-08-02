import React, { useState } from 'react';
import './modal.scss';
import { useAddProductMutation } from '../../redux';
import Button from '../Button';
import Input from '../UI/Input';

const Modal = ({ active, setActive }) => {
    const [newProduct, setNewProduct] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newDate, setNewDate] = useState('');
    const [addProduct, { isError }] = useAddProductMutation();

    const handleAddProduct = async () => {
        if (newProduct) {
            await addProduct({
                name: newProduct,
                email: newEmail,
                date: newDate,
            }).unwrap();
            setNewProduct('');
            setNewEmail('');
            setNewDate('');
        }
    };

    return (
        <div className={active ? 'modal active' : 'modal'} onClick={(e) => e.stopPropagation()}>
            <Input
                type="text"
                placeholder="Введите задачу"
                value={newProduct}
                onChange={(e) => setNewProduct(e.target.value)}
            />
            <Button onClick={handleAddProduct} type="info" text="Добавить" />
            <Button onClick={() => setActive(false)} type="danger" text="Закрыть" />
        </div>
    );
};

export default Modal;
