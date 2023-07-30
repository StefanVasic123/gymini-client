import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Dashboard from './pages/User/Home';
import Login from './pages/Authentication/User/Login';
import Register from './pages/Authentication/User/Register';
import Admin from './pages/Admin/index';
import Client from './pages/Client';
import ClientLogin from './pages/Authentication/Client/ClientLogin';
import ClientRegister from './pages/Authentication/Client/ClientRegister';

function App() {
  const adminToken = localStorage.getItem('admin');
  const { admin } = useSelector((state) => state.auth);

  const isAdminAuthorized = () => {
    return adminToken && admin !== null;
  };

  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' exact element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route
              path={'/admin/*'}
              element={isAdminAuthorized() ? <Admin /> : <Navigate to='/' />} // Redirect to '/' if not authorized
            />
            <Route path={'/admin/reports'} element={<Admin />} />
            <Route path={'/admin/settings'} element={<Admin />} />
            <Route path={'/admin/account'} element={<Admin />} />
            <Route path={'/client'} element={<Client />} />
            <Route path={'/client-login'} element={<ClientLogin />} />
            <Route path={'client-register'} element={<ClientRegister />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
