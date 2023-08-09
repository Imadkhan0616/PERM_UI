import { Navigate, useLocation } from 'react-router-dom';


export function RequireAuth({ children, isLoggedIn }) {
    // const isAuthenticated = isAuthenticated(); // your logic here
    const location = useLocation();

    if (!isLoggedIn) {
        return <Navigate to="/" state={{ from: location }} />;
    }

    return children;
}