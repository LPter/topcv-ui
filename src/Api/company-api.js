import axios from 'axios';

export const getCompany = async (companyId) => {
    try {
        const { data } = await axios.get(`http://localhost:8000/companies/${companyId}`);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const createCompany = async (
    name,
    email,
    password,
    website,
    employeeNumber,
    introduction,
    address,
    location,
) => {
    const payLoad = new URLSearchParams({
        name: name,
        email: email,
        password: password,
        website: website,
        employeeNumber: employeeNumber,
        introduction: introduction,
        address: address,
        location: location,
    });
    try {
        const { data } = await axios.post(`http://localhost:8000/companies`, payLoad, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const getCompanies = async (page, limit) => {
    try {
        const { data } = await axios.get(`http://localhost:8000/companies?page=${page}&limit=${limit}`);
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const updateCompany = async (id, name, website, employeeNumber, introduction, address, location) => {
    const payLoad = new URLSearchParams({
        name: name,
        website: website,
        employeeNumber: employeeNumber,
        introduction: introduction,
        address: address,
        location: location,
    });
    try {
        const { data } = await axios.put(`http://localhost:8000/companies/${id}`, payLoad, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const deleteCompany = async (companyId) => {
    try {
        const { data } = await axios.delete(`http://localhost:8000/companies/${companyId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const createJob = async (name, expired, salary, recruitQuantity, workFormat, level, gender, experience) => {
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
        const { data } = await axios.post(`http://localhost:8000/companies/jobs`, payLoad, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const companyFollow = async (companyId, currentUser) => {
    let payLoad = new URLSearchParams(currentUser);
    try {
        const { data } = await axios.put(`http://localhost:8000/companies/follow/${companyId}`, payLoad, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};

export const companyUnFollow = async (companyId, currentUser) => {
    let payLoad = new URLSearchParams(currentUser);
    try {
        const { data } = await axios.put(`http://localhost:8000/companies/unfollow/${companyId}`, payLoad, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};
