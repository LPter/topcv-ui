import axios from 'axios';

export const getJobs = async () => {
    try {
        const { data } = await axios.get('http://localhost:8000/jobs');
        return data;
    } catch (error) {
        error.response.data?.message && alert(error.response.data?.message);
    }
};
