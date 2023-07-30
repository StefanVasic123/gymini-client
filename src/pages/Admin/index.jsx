import './styles/index.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './pages/sidebar';
import Content from './pages/content';
import { useNavigate } from 'react-router-dom';
import checkAdminAuthorization from '../../services/adminAuthMiddleware';

const Admin = () => {
  const { admin, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('admin')) {
      checkAdminAuthorization(dispatch, admin, user, navigate);
    }
    if (!admin?.adminToken) {
      navigate('/');
    }
  }, []);
  return (
    <div className='admin-main'>
      <Sidebar />
      <Content />
    </div>
  );
};

export default Admin;
