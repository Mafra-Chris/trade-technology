import { createBrowserRouter, Route } from 'react-router-dom';
import Index from './pages';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
]);
