import { useNavigate } from 'react-router-dom';
import { COLOR_TYPES, ICON_NAMES } from '../../../library/constants.enum';
import Box from './icons/Box';
import Close from './icons/Close';
import Home from './icons/Home';
import Plus from './icons/Plus';
import Profile from './icons/Profile';
import Star from './icons/Star';
import Sun from './icons/Sun';
import './index.scss';
import { useState } from 'react';
import Menu from './icons/Menu';
import Sorted from './icons/Sorted';

interface ButtonProps {
    className?: string;
    text?: string;
    type?: COLOR_TYPES;
    onlyIcon?: boolean;
    iconName?: ICON_NAMES;
    disabled?: boolean;
    onClick?(): void;
}

const getIcon = (iconName: ICON_NAMES): JSX.Element => {
    switch (iconName) {
        case ICON_NAMES.close:
            return <Close />;

        case ICON_NAMES.home:
            return <Home />;

        case ICON_NAMES.sun:
            return <Sun />;

        case ICON_NAMES.box:
            return <Box />;

        case ICON_NAMES.star:
            return <Star />;

        case ICON_NAMES.profile:
            return <Profile />;

        case ICON_NAMES.plus:
            return <Plus />;

        case ICON_NAMES.menu:
            return <Menu />;

        case ICON_NAMES.sorted:
            return <Sorted />;

        default:
            return <></>;
    }
};

const getColor = (type: COLOR_TYPES | undefined): string => {
    switch (type) {
        case COLOR_TYPES.info:
            return 'info';

        case COLOR_TYPES.danger:
            return 'danger';

        default:
            return 'default';
    }
};

const Button = ({
    text,
    type,
    onlyIcon,
    iconName = ICON_NAMES.close,
    className,
    disabled,
    onClick,
}: ButtonProps): JSX.Element => {
    return onlyIcon ? (
        <button className={`button only-icon ${className}`} onClick={onClick} disabled={disabled}>
            {getIcon(iconName)}
            {text}
        </button>
    ) : (
        <button
            className={`button text ${className} ${getColor(type)}`}
            disabled={disabled}
            onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
