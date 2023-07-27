import React from 'react';
import Button from '../Button';
import './index.scss';

const Items = (item: { id: number; name: string }) => {
    return (
        <div className="list__items" key={item.id}>
            <span> {item.name}</span>
        </div>
    );
};

export default Items;
