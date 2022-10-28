import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './Components/GlobalStyles';
import { AuthProvider } from './Auth/AuthProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from 'react-router-dom';

const GOOGLE_CLIENT_ID = '108280594432-omqmp01tkniis47snett8h6ncajf3fsq.apps.googleusercontent.com';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <AuthProvider>
            <BrowserRouter>
                <GlobalStyles>
                    <App />
                </GlobalStyles>
            </BrowserRouter>
        </AuthProvider>
    </GoogleOAuthProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
