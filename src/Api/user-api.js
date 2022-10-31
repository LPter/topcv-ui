import axios from 'axios';

export const login = async (email, password) => {
    const payLoad = new URLSearchParams({
        email: email,
        password: password,
    });

    try {
        const { data } = await axios.post('https://topcv-api.herokuapp.com/users/login', payLoad);
        localStorage.setItem('token', data.access_token);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const loginOAuth = async (email, username, avatar) => {
    const payload = new URLSearchParams({
        email,
        username,
        avatar,
    });

    try {
        const { data } = await axios.post('https://topcv-api.herokuapp.com/users/login-oauth', payload);
        localStorage.setItem('token', data.access_token);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const getUsers = async (page, limit) => {
    try {
        const { data } = await axios.get(`https://topcv-api.herokuapp.com/users?page=${page}&limit=${limit}`);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const getUser = async (idUser) => {
    try {
        const { data } = await axios.get(`https://topcv-api.herokuapp.com/users/${idUser}`);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const signup = async (username, email, password) => {
    const payload = new URLSearchParams({
        username: username,
        email: email,
        password: password,
    });

    try {
        const { data } = await axios.post('https://topcv-api.herokuapp.com/users/signup', payload);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};
export const getCurrentUser = async () => {
    try {
        const { data } = await axios.get('https://topcv-api.herokuapp.com/users/me', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
        return data;
    } catch (error) {
        console.log(error.response.data?.message);
    }
};

export const updateProfile = async (profileUploaded, avatar) => {
    const payload = new URLSearchParams({
        username: profileUploaded.username,
        password: profileUploaded.password,
    });

    try {
        if (avatar) {
            let data = new FormData();
            data.append('file', avatar);
            await axios.post('https://topcv-api.herokuapp.com/users/upload-avatar', data, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            });
        }
        const { data } = await axios.put(`https://topcv-api.herokuapp.com/users/${profileUploaded.id}`, payload, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
        return data;
    } catch (error) {
        if (error.response.status === 413) alert('Image too large !!');
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const sendForgotPasswordMail = async (forgotEmail) => {
    const payload = new URLSearchParams({
        email: forgotEmail,
    });

    try {
        const { data } = await axios.post('https://topcv-api.herokuapp.com/users/forgot', payload);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const deleteUser = async (userId) => {
    try {
        const { data } = await axios.delete(`https://topcv-api.herokuapp.com/users/${userId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};
