import './styles/index.scss';
import Sidebar from './pages/sidebar';
import Content from './pages/content';

const Admin = () => {
  return (
    <div className='admin-main'>
      <Sidebar />
      <Content />
    </div>
  );
};

export default Admin;
