import useAuth from '../../hooks/useAuth';

function CompanyPage() {
    const { auth } = useAuth();
    console.log(auth);
    return <h1>CompanyPage</h1>;
}

export default CompanyPage;
