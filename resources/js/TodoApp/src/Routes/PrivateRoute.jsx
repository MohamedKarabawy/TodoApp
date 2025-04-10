import { Navigate } from 'react-router-dom';
import { getDecryptedCookie } from '../utils/cookieUtils';

const PrivateRoute = ({ element }) => {
    const token = getDecryptedCookie('data')?.token;

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return element;
};

export default PrivateRoute;
