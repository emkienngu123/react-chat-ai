import React from 'react'
import App from './App.jsx'
import './index.css'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from '../src/store/app.js'
import ChatDetail from './pages/ChatDetail.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        index: true,
        element: <Navigate to='chat/info'/>
      },
      {
        path: "/chat/info",
        element: <ChatDetail></ChatDetail>
      },
      {
        path: '/chat/:id',
        element: <ChatDetail/>
      },

    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>

  </React.StrictMode>
);
