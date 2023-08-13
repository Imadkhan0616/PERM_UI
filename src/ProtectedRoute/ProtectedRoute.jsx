import React from "react";
import { Navigate, Outlet } from "react-router-dom";

let isFound = false;

const ProtectedRoute = ({ isAuthenticated, children, location, excludeUrl = [] }) => {

    const userMenu = JSON.parse(localStorage.getItem('menu'));

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    console.log(excludeUrl.includes(location.pathname.toLowerCase()));

    if (excludeUrl.length === 0 || !excludeUrl.includes(location.pathname.toLowerCase())) {

        isFound = false;

        if (!isAuthorized(location.pathname, userMenu)) {
            return <Navigate to="/NotAuthorized" />;
        }
    }

    return children ? children : <Outlet />;
};

function isAuthorized(path, userMenu = []) {

    if (!path || userMenu === undefined || userMenu.length === 0) return false;

    for (let index = 0; index < userMenu.length; index++) {
        const item = userMenu[index];

        if (item.subMenu)
            isAuthorized(path, item.subMenu);

        if (!isFound)
            isFound = item.link.toLowerCase() === path.toLowerCase();

        if (isFound) return true;
    }

    return isFound;
}

export default ProtectedRoute;