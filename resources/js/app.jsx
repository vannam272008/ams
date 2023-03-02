import React from 'react';
import { createRoot } from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import router from './Pages/App';
import userReducer from './Reducers/userReducers';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore({
    reducer: {
        user: userReducer,
    },
    middleware: [thunk],
});

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
