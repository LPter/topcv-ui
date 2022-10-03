// import { Alert } from 'react-bootstrap';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = ({ allowedRole }) => {
    const { auth } = useAuth();
    const location = useLocation();
    // const authRole = auth.role;

    return auth?.role === allowedRole ? (
        <Outlet />
    ) : auth?.emailInput ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
