import axios from 'axios';

export const getCVs = async (page, limit) => {
    try {
        const { data } = await axios.get(`https://topcv-api.herokuapp.com/cv?page=${page}&limit=${limit}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const getCVsByCompany = async (page, limit) => {
    try {
        const { data } = await axios.get(`https://topcv-api.herokuapp.com/cv/my-company?page=${page}&limit=${limit}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const deleteCV = async (CVid) => {
    try {
        const { data } = await axios.delete(`https://topcv-api.herokuapp.com/cv/${CVid}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};
