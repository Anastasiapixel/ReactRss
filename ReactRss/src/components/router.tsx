import { createBrowserRouter } from 'react-router-dom';
import SearchApp from '../App';

import { Result } from './result';

export const ROUTING = [
  {
    children: [
      {
        path: 'results/:name/:date',
        element: <Result names={[]} date={[]} />,
        errorElement: <p>Error</p>,
      },
    ],
    path: '/',
    element: <SearchApp />,
    errorElement: <p>Error</p>,
  },
];
export const router = createBrowserRouter(ROUTING);
