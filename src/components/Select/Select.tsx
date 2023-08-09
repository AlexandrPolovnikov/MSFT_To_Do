import React from 'react';
import './index.scss';

const Select = ({ options, defaultValue, value, onChange }: any) => {
    return (
        <div className="container">
            <select
                className="sorted"
                value={value}
                onChange={(event) => onChange(event.target.value)}>
                {/* <option disabled={true} value="">
                    {defaultValue}⇅ Сортировка
                </option> */}
                {options.map((option: any) => (
                    <option key={option.value} value={option.value}>
                        ⇅ {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
