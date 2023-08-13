import { createReducer } from "@reduxjs/toolkit";

export const rootReducer = createReducer(
    { isAuthenticated: false },
    {
        login: (state) => {
            state.isAuthenticated = localStorage.getItem('token') === null || localStorage.getItem('token').length === 0 ? false : true;
        },
        logout: (state) => {
            localStorage.removeItem('token');
            state.isAuthenticated = false;
        }
    }
);