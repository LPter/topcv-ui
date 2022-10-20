import { Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './Components/Layouts';
import RequireAuth from './Auth/RequireAuth';
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
import AdminPage from './pages/AdminPage';
import CompanyDetailPage from './pages/CompanyDetailPage';
import CreateJobPage from './pages/CreateJobPage';

function App() {
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
                    path="/jobs/:jobId"
                    element={
                        <DefaultLayout>
                            <JobDetailPage />
                        </DefaultLayout>
                    }
                />

                <Route
                    path="/company/:companyId"
                    element={
                        <DefaultLayout>
                            <CompanyDetailPage />
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
                    ></Route>
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
                    <Route path="/company/create-job" element={<CreateJobPage />} />
                </Route>
            </Routes>
        </React.Fragment>
    );
}

export default App;
