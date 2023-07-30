import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginAdmin } from '../../../features/auth/authSlice';
import Spinner from '../../../components/Spinner';
import LoginAdminForm from '../../../components/Forms/LoginAdminForm';
import { setShowAdminConfirmationModal } from '../../../features/modals/modalSlice';

function LoginAdmin() {
  const [formData, setFormData] = useState({
    adminPassword: '',
  });

  const { adminPassword } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { admin, user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || (admin && localStorage.getItem('adminToken') && message)) {
      navigate('/admin');
      dispatch(setShowAdminConfirmationModal(false));
    }
  }, [admin, isError, isSuccess, message]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const adminData = {
      email: user.email,
      adminPassword,
      adminSecret: user.adminSecret,
    };

    dispatch(loginAdmin(adminData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <LoginAdminForm
      onSubmit={onSubmit}
      onChange={onChange}
      adminPassword={adminPassword}
    />
  );
}

export default LoginAdmin;
