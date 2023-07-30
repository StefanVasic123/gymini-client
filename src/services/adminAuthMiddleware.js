import { api } from './ApiService';
import { authAdmin, logoutAdmin } from '../features/auth/authSlice';

async function checkAdminAuthorization(dispatch, admin, user, navigate) {
  try {
    // Retrieve the adminToken from the Redux store
    const adminToken = admin?.adminToken;
    const token = user?.token;
    const adminSecret = admin?.adminSecret;
    const tokenData = { adminToken, token };

    // Check if the adminToken is present
    if (adminToken) {
      // Make a request to the backend to validate the adminToken
      const response = await api.get('/api/users/admin', {
        headers: {
          adminToken,
          token,
          adminSecret,
        },
      });

      // If the backend response indicates that the token is valid (status 200),
      // the user is authenticated as an admin, so update the Redux store
      if (response.status === 200) {
        dispatch(authAdmin(tokenData));
      } else {
        // If the adminToken is not valid or the user is not an admin, log out the user and redirect to another page
        navigate('/');
        dispatch(logoutAdmin());
      }
    } else {
      // If the adminToken is not present, log out the user and redirect to another page
      navigate('/');
      dispatch(logoutAdmin());
    }
  } catch (error) {
    // Handle errors here (e.g., server error, token validation failure)
    // Redirect the user to another page or show an error message
    navigate('/');
    dispatch(logoutAdmin());
  }
}

export default checkAdminAuthorization;
