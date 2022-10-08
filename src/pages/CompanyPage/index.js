import { useContext } from 'react';
import AuthContext from '../../Auth/AuthProvider';

function CompanyPage() {
    const { auth } = useContext(AuthContext);
    console.log(auth);
    return <h1>CompanyPage</h1>;
}

export default CompanyPage;
