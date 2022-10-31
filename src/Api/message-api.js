import axios from 'axios';

export const getUsersSent = async () => {
    try {
        const { data } = await axios.get(`http://topcv-api.herokuapp.com/messages/users-sent`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const getMessagesToUserId = async (toUserId) => {
    try {
        const { data } = await axios.get(`http://topcv-api.herokuapp.com/messages/${toUserId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};
