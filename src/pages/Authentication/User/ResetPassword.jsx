import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  resetAdminPassword,
  resetPassword,
} from '../../../features/auth/authSlice';
import Spinner from '../../../components/Spinner';
import ResetPasswordForm from '../../../components/ResetPasswordForm';

function ResetPassword({ admin }) {
  const [formData, setFormData] = useState({
    password: '',
    passwordConfirm: '',
  });
  const { password, passwordConfirm } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    /*
    if (isSuccess || (user && localStorage.getItem('user') && message)) {
      dispatch(getClients());
      navigate('/');
    }

    dispatch(reset());
*/
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = { password };

    if (password !== passwordConfirm) {
      toast.error('Šifre se ne podudaraju. Pokušajte ponovo');
      setFormData({
        password: '',
        passwordConfirm: '',
      });
    } else {
      dispatch(admin ? resetAdminPassword(userData) : resetPassword(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ResetPasswordForm
      onSubmit={onSubmit}
      onChange={onChange}
      password={password}
      passwordConfirm={passwordConfirm}
      admin={admin}
    />
  );
}

export default ResetPassword;
