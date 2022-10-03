import axios from 'axios';

export const login = async (email, password) => {
    const payLoad = new URLSearchParams({
        email: email,
        password: password,
    });

    try {
        const { data } = await axios.post('http://localhost:8000/users/login', payLoad);
        localStorage.setItem('token', data.access_token);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const getCurrentUser = async () => {
    try {
        const { data } = await axios.get('http://localhost:8000/users/me', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
        return data;
    } catch (error) {
        console.log(error.response.data?.message);
    }
};
