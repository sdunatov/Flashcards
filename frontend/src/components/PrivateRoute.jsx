import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    const { userInfo } = useSelector((state) => state.auth); // to nam daje user info
    return userInfo ? <Outlet /> : <Navigate to='/login' replace />
}

export default PrivateRoute