import React from 'react';
import Button from '../UI/Button';
import './index.scss';

const Items = (item: { id: number; title: string }) => {
    return (
        <div className="list__items" key={item.id}>
            <span> {item.title}</span>
        </div>
    );
};

export default Items;
