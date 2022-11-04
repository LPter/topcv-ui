import axios from 'axios';

export const getNotification = async () => {
    try {
        const { data } = await axios.get('https://topcv-api.herokuapp.com/notification/me', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const deleteNotification = async (notificationId) => {
    try {
        const { data } = await axios.delete(`https://topcv-api.herokuapp.com/notification/${notificationId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};
