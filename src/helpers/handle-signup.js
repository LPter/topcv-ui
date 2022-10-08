import { userSchemaSignUp } from './validation-user';
import { signup } from '../Api/user-api';

export const handleSignUP = (username, email, password, passwordAuth, navigate) => {
    userSchemaSignUp
        .validate({
            username: username,
            email: email,
            password: password,
            passwordAuth: passwordAuth,
        })
        .then((response) => {
            if (response) {
                signup(username, email, password).then((responseData) => {
                    if (responseData) {
                        alert('Signup success');
                        navigate('/login', { replace: true });
                    }
                });
            }
        })
        .catch((err) => {
            alert(err.errors);
        });
};
