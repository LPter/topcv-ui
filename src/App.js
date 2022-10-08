import { Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './Components/Layouts';
import RequireAuth from './Auth/RequireAuth';
import AdminPage from './pages/AdminPage';
import CompanyPage from './pages/CompanyPage';
import UserPage from './pages/UserPage';
import Home from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import JobDetailPage from './pages/JobDetailPage';
import SearchPage from './pages/SearchPage';
import Unauthorized from './pages/Unauthorized';
import UserProfilePage from './pages/UserProfilePage';
import React from 'react';
// import PersistentAuth from './Auth/PersistentAuth';
// import { getCurrentUser } from './Api/user-api';
// import { useContext, useEffect } from 'react';
// import AuthContext from './Auth/AuthProvider';

function App() {
    // const { auth, setAuth } = useContext(AuthContext);
    // useEffect(() => {
    //     getCurrentUser().then((currentUser) => {
    //         setAuth(currentUser);
    //         console.log(auth);
    //     });
    // }, []);
    return (
        <React.Fragment>
            {/* public routes */}
            <Routes>
                <Route
                    path="/"
                    element={
                        <DefaultLayout>
                            <Home />
                        </DefaultLayout>
                    }
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route
                    path="/job-detail"
                    element={
                        <DefaultLayout>
                            <JobDetailPage />
                        </DefaultLayout>
                    }
                />
                <Route
                    path="/search"
                    element={
                        <DefaultLayout>
                            <SearchPage />
                        </DefaultLayout>
                    }
                />
                {/* private routes */}
                <Route element={<RequireAuth allowedRole="admin" />}>
                    <Route
                        path="/admin"
                        element={
                            <DefaultLayout>
                                <AdminPage />
                            </DefaultLayout>
                        }
                    />
                </Route>
                <Route element={<RequireAuth allowedRole="user" />}>
                    <Route
                        path="/user"
                        element={
                            <DefaultLayout>
                                <UserPage />
                            </DefaultLayout>
                        }
                    />
                    <Route
                        path="/user/profile"
                        element={
                            <DefaultLayout>
                                <UserProfilePage />
                            </DefaultLayout>
                        }
                    />
                </Route>
                <Route element={<RequireAuth allowedRole="company" />}>
                    <Route
                        path="/company"
                        element={
                            <DefaultLayout>
                                <CompanyPage />
                            </DefaultLayout>
                        }
                    />
                </Route>
            </Routes>
        </React.Fragment>
    );
}

export default App;
