import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Room from './components/Room.tsx';
import Home from './pages/Home.tsx';

// Create a browser router and define the routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Main App component that wraps around the other pages
    children: [
      {
        path: "/",
        element: <Home /> // Home page route nested under the root
      },
      {
        path: "/live-streaming", // Live streaming page route
        element: <Room />
      }
    ]
  },
]);

// Render the application with React Router
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
