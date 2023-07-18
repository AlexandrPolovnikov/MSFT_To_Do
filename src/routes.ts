import { FC } from 'react';
import MyDay from './components/MyDay';
import Planned from './components/Planned';
import Task from './components/Task';
import Completed from './components/Completed';

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
