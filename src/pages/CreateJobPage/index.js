import CreateJobForm from '../../Components/CreateJobForm';
import { useContext } from 'react';
import AuthContext from '../../Auth/AuthProvider';

function CreateJobPage() {
    const { auth } = useContext(AuthContext);

    return <CreateJobForm id={auth?.id} />;
}

export default CreateJobPage;
