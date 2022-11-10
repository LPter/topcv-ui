import { userSchema } from './validation-user';
import { login, getCurrentUser } from '../Api/user-api';

export const handleLogin = (email, password, setAuth, navigate, location) => {
    let from = location.state?.from?.pathname || '/';

    userSchema
        .validate({
            email: email,
            password: password,
        })
        .then(() => {
            login(email, password).then((res) => {
                if (res) {
                    getCurrentUser().then((currentUser) => {
                        setAuth(currentUser);
                        navigate(`/${currentUser?.role}`);
                    });
                }
            });
        })
        .catch((err) => {
            alert(err.errors);
        });
};
