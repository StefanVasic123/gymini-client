import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getClients } from '../../../features/clients/clientSlice';
import { toast } from 'react-toastify';
import { login, reset } from '../../../features/auth/authSlice';
import Spinner from '../../../components/Spinner';
import LoginForm from '../../../components/LoginForm';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || (user && localStorage.getItem('user') && message)) {
      dispatch(getClients());
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
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <LoginForm
      onSubmit={onSubmit}
      email={email}
      onChange={onChange}
      password={password}
    />
  );
}

export default Login;
