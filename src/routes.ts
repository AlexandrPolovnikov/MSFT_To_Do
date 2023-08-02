import { FC } from 'react';
import MyDay from './components/pages/MyDay';
import Planned from './components/pages/Planned';
import Task from './components/pages/Task';
import Completed from './components/pages/Completed';

export interface rout {
    path: string;
    Component: FC;
}

const routes: rout[] = [
    { path: '/', Component: MyDay },
    { path: '/planned', Component: Planned },
    { path: '/completed', Component: Completed },
    { path: '/task', Component: Task },
];

export default routes;
