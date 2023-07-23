export const isAuthenticated = () => {
    return localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined;
};