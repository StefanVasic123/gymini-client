import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { forgotPassword, login, reset } from '../../../features/auth/authSlice';
import Spinner from '../../../components/Spinner';
import ForgotPasswordForm from '../../../components/ForgotPasswordForm';

function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: '',
  });

  const { email } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success('Link za reset šifre poslat na email');
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
    };

    dispatch(forgotPassword(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ForgotPasswordForm onSubmit={onSubmit} email={email} onChange={onChange} />
  );
}

export default ForgotPassword;
