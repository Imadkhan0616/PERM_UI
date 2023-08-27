import { createReducer } from "@reduxjs/toolkit";

export const rootReducer = createReducer(
    { isAuthenticated: false },
    {
        login: (state) => {
            state.isAuthenticated = localStorage.getItem('token') === null || localStorage.getItem('token').length === 0 ? false : true;
        },
        logout: (state) => {
            localStorage.removeItem('token');
            localStorage.removeItem('menu');
            localStorage.removeItem('role');
            localStorage.removeItem('tenantID');
            localStorage.removeItem('username');
            localStorage.removeItem('businessPartnerID');
            state.isAuthenticated = false;
        }
    }
);