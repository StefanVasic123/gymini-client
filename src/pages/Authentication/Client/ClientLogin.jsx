import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginClient } from '../../../features/clients/clientSlice';
import { toast } from 'react-toastify';
import Spinner from '../../../components/Spinner';
import LoginForm from '../../../components/LoginForm';

function ClientLogin() {
  const [formData, setFormData] = useState({
    password: '',
  });

  const { password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { client, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.clients
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || (client && localStorage.getItem('client') && message)) {
      navigate('/client');
    }

    //  dispatch(reset());
  }, [client, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const clientData = {
      password,
    };

    dispatch(loginClient(clientData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <LoginForm
      onSubmit={onSubmit}
      email={client}
      onChange={onChange}
      password={password}
    />
  );
}

export default ClientLogin;
