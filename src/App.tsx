import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import routes from './routes';
import Input from './components/UI/Input';
import Button from './components/UI/Button';
import { ICON_NAMES } from './library/constants.enum';
import { useState } from 'react';

function App() {
    const [active, setActive] = useState(false);
    const navigate = useNavigate();

    const clickActive = (value: string) => {
        if (active) {
            setActive(false);
        } else {
            setActive(true);
        }
        navigate(`/${value}`);
    };

    return (
        <div className="Main">
            <header className="Header">
                <Button
                    className="button-menu plus-icon"
                    onlyIcon
                    iconName={ICON_NAMES.menu}
                    onClick={() => (active ? setActive(false) : setActive(true))}
                />
                <div className="Header__icon">
                    <span>To Do</span>
                </div>
                <Input />
                <div></div>
            </header>
            <div className={active ? 'Menu active' : 'Menu'} onClick={(e) => e.stopPropagation()}>
                <Button
                    className="button home-icon"
                    text="Мой день"
                    onlyIcon
                    iconName={ICON_NAMES.sun}
                    onClick={() => clickActive('')}
                />
                <Button
                    className="item__button home-icon"
                    text="Planned"
                    onlyIcon
                    iconName={ICON_NAMES.star}
                    onClick={() => clickActive('planned')}
                />
                <Button
                    className="item__button home-icon"
                    text="Completed"
                    onlyIcon
                    iconName={ICON_NAMES.box}
                    onClick={() => clickActive('completed')}
                />
                <Button
                    className="item__button home-icon"
                    text="Task"
                    onlyIcon
                    iconName={ICON_NAMES.home}
                    onClick={() => clickActive('task')}
                />
            </div>
            <div>
                <div>
                    <Routes>
                        {routes.map((route) => (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={<route.Component />}
                            />
                        ))}
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
