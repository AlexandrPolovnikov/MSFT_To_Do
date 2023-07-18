import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import routes from './routes';
import Input from './components/Input';
import Button from './components/Button';
import { COLOR_TYPES, ICON_NAMES } from './library/constants.enum';

function App() {
    const navigate = useNavigate();

    return (
        <div className="Main">
            <header className="Main__menu">
                <span>Kto-to@mail.com</span>
                <Input />
                <Button
                    className="btn btn-primary"
                    text="My Day"
                    type={ICON_NAMES.home}
                    onClick={() => navigate('/')}
                />
                <Button
                    className="btn btn-primary"
                    text="Planned"
                    type={COLOR_TYPES.info}
                    onClick={() => navigate('/planned')}
                />
                <Button
                    className="btn btn-primary"
                    text="Completed"
                    type={COLOR_TYPES.info}
                    onClick={() => navigate('/completed')}
                />
                <Button
                    className="btn btn-primary"
                    text="Task"
                    type={COLOR_TYPES.info}
                    onClick={() => navigate('/task')}
                />
            </header>
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
