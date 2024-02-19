import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ element: Component, isAuthenticated, redirectPath, ...rest }) => {
  const pathnew = '/'+redirectPath+'/';
  return isAuthenticated ? (
    <Component />
    ) : (
    <Navigate to={pathnew} replace={true} state={{ from: rest.location }} />
  );
};


AuthRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  redirectPath: PropTypes.string.isRequired,
};

export default AuthRoute;