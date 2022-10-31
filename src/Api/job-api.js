import axios from 'axios';

export const getJobs = async (page, limit, search, salary, workFormat, level, location) => {
    try {
        let query = `http://topcv-api.herokuapp.com/jobs?page=${page}&search=${search}&limit=${limit}`;
        if (salary) {
            query += `&salary=${salary}`;
        }
        if (workFormat) {
            query += `&workFormat=${workFormat}`;
        }
        if (level) {
            query += `&level=${level}`;
        }
        if (location) {
            query += `&location=${location}`;
        }
        const { data } = await axios.get(query);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const getJob = async (jobId) => {
    try {
        const { data } = await axios.get(`http://topcv-api.herokuapp.com/jobs/${jobId}`);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const upLoadCV = async (jobId, cv) => {
    try {
        let data = new FormData();
        data.append('file', cv);
        await axios.post(`http://topcv-api.herokuapp.com/jobs/upload-cv/${jobId}`, data, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const updateJob = async (id, name, expired, salary, recruitQuantity, workFormat, level, gender, experience) => {
    const payLoad = new URLSearchParams({
        name: name,
        expired: expired,
        salary: salary,
        recruitQuantity: recruitQuantity,
        workFormat: workFormat,
        level: level,
        gender: gender,
        experience: experience,
    });
    try {
        const { data } = await axios.put(`http://topcv-api.herokuapp.com/jobs/${id}`, payLoad, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const deleteJob = async (jobId) => {
    try {
        const { data } = await axios.delete(`http://topcv-api.herokuapp.com/jobs/${jobId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};
