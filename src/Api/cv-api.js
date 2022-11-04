import axios from 'axios';

export const getCVs = async (page, limit) => {
    try {
        const { data } = await axios.get(`http://localhost:8000/cv?page=${page}&limit=${limit}`, {
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
        const { data } = await axios.get(`http://localhost:8000/cv/my-company?page=${page}&limit=${limit}`, {
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
        const { data } = await axios.delete(`http://localhost:8000/cv/${CVid}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};
