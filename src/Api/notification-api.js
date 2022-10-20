import axios from 'axios';

export const getNotification = async () => {
    try {
        const { data } = await axios.get('http://localhost:8000/notification/me', {
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
        const { data } = await axios.delete(`http://localhost:8000/notification/${notificationId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};
