import { useLocation, Navigate, Outlet } from 'react-router-dom';
import AuthContext from './AuthProvider';
import { useContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../Api/user-api';

const RequireAuth = ({ allowedRole }) => {
    const { auth, setAuth } = useContext(AuthContext);
    const location = useLocation();
    const [state, setState] = useState(false);
    useEffect(() => {
        getCurrentUser()
            .then((currentUser) => {
                setAuth(currentUser);
            })
            .then(() => setState(true));
    }, []);

    return (
        <div>
            {state &&
                (auth?.role === allowedRole ? (
                    <Outlet />
                ) : auth?.access_token ? (
                    <Navigate to="/unauthorized" state={{ from: location }} replace />
                ) : (
                    <Navigate to="/login" state={{ from: location }} replace />
                ))}
        </div>
    );
};

export default RequireAuth;
