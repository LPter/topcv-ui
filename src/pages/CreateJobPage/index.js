import classNames from 'classnames';
import styles from './CreateJobPage.module.scss';
import CreateJobForm from '../../Components/CreateJobForm';
import { useContext } from 'react';
import AuthContext from '../../Auth/AuthProvider';

const cx = classNames.bind(styles);

function CreateJobPage() {
    const { auth } = useContext(AuthContext);

    return <CreateJobForm id={auth?.id} />;
}

export default CreateJobPage;
