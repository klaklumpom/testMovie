import { Navigate, Outlet } from 'react-router-dom';

// eslint-disable-next-line import/no-unresolved
// import { useAuth } from './auth';

const PrivateRoutes = ({ children }) => {
  const auth = { token: localStorage.getItem('user') };
  //   const location = useLocation();
  //   console.log(location.state);
  if (!auth.token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoutes;
