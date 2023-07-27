import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import routes from './routes';
import Input from './components/Input';
import Button from './components/Button';
import { ICON_NAMES } from './library/constants.enum';
import { useState } from 'react';

function App() {
    const [active, setActive] = useState(false);
    const navigate = useNavigate();

    const clickActive = () => {
        if (active) {
            setActive(false);
        } else {
            setActive(true);
        }
    };

    return (
        <div className="Main">
            <header className="Header">
                <div className="Header__icon">
                    <Button
                        className="button plus-icon"
                        onlyIcon
                        iconName={ICON_NAMES.profile}
                        onClick={clickActive}
                    />
                    <span>To Do</span>
                </div>
                <Input />
                <div></div>
            </header>
            <div className={active ? 'Menu active' : 'Menu'}>
                <Button
                    className="button home-icon"
                    text="Мой день"
                    onlyIcon
                    iconName={ICON_NAMES.sun}
                    onClick={() => navigate('/')}
                />
                <Button
                    className="item__button home-icon"
                    text="Planned"
                    onlyIcon
                    iconName={ICON_NAMES.star}
                    onClick={() => navigate('/planned')}
                />
                <Button
                    className="item__button home-icon"
                    text="Completed"
                    onlyIcon
                    iconName={ICON_NAMES.box}
                    onClick={() => navigate('/completed')}
                />
                <Button
                    className="item__button home-icon"
                    text="Task"
                    onlyIcon
                    iconName={ICON_NAMES.home}
                    onClick={() => navigate('/task')}
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
