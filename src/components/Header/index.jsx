import { useState } from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { IoIosCreate } from 'react-icons/io';
import { CgGym } from 'react-icons/cg';
import { BiBarcodeReader } from 'react-icons/bi';
import { GiBodyBalance } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, logoutAdmin, reset } from '../../features/auth/authSlice';
import { resetClients } from '../../features/clients/clientSlice';
import { setShowAddClientModal } from '../../features/modals/modalSlice';
import QrReader from 'react-qr-scanner';
import ConfirmationModal from '../ConfirmationModal';
import * as Pos from '../ConfirmationModal';
import { setShowAdminConfirmationModal } from '../../features/modals/modalSlice';
import { resetLoginAdminForm } from '../../features/forms/loginAdminSlice';
import LoginAdmin from '../../pages/Authentication/User/LoginAdmin';
import { setAuthToken } from '../../services/ApiService';

function Header() {
  const [qrReader, setQrReader] = useState(false);
  const [typeUser, setTypeUser] = useState(false);
  const [typeClient, setTypeClient] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, admin } = useSelector((state) => state.auth);
  let { showAdminConfirmationModal } = useSelector((state) => state.modals);
  const client = false;

  function handleShowModal() {
    dispatch(setShowAddClientModal(true));
  }

  function handleAdmin() {
    if (admin?.adminToken) {
      navigate('/admin');
    } else {
      dispatch(setShowAdminConfirmationModal(true));
    }
  }

  const url = window.location.href;

  function hideAdminElements(url) {
    if (url.includes('admin')) {
      // The URL contains the string 'admin'
      return true;
    } else {
      // The URL does not contain the string 'admin'
      return false;
    }
  }

  function handleQrReader() {
    setQrReader(!qrReader);
  }

  function handleScan(data) {
    let client = data?.text.split(',');
    // procedura za cekiranje endDate-a
    // da li imamo user-a sa tim mail-om
    // compare endDate
    if (data !== null) {
      alert('Uspesno ocitan QR CODE!');
      console.log('DATA: ', {
        name: client[0],
        last_name: client[1],
      });
      setQrReader(false);
    }
  }

  function handleError(err) {
    console.log('ERROR: ', err);
  }

  function hideModal() {
    dispatch(setShowAdminConfirmationModal(false));
  }

  function handleCloseModal() {
    dispatch(resetLoginAdminForm());
  }

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    dispatch(resetClients());
    navigate('/');
  };

  function handleAdminLogout() {
    localStorage.removeItem('admin');
    dispatch(logoutAdmin());
    window.location.reload();
    navigate('/');
    setAuthToken(null);
  }

  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>Gymini</Link>
      </div>
      <ul>
        {user ? (
          <>
            {!hideAdminElements(url) && (
              <>
                <li style={{ cursor: 'pointer' }} onClick={handleAdmin}>
                  Admin
                </li>
                <li
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                  onClick={handleShowModal}
                >
                  <IoIosCreate /> Create
                </li>
                <li
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  onClick={handleQrReader}
                >
                  <BiBarcodeReader size={35} />
                </li>
              </>
            )}
            {admin?.adminToken && (
              <li
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
                onClick={handleAdminLogout}
              >
                <FaSignOutAlt /> Admin Logout
              </li>
            )}
            <li>
              <button className='btn' onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : client ? (
          <>
            <p>CLIENT</p>
          </>
        ) : typeUser ? (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
          </>
        ) : typeClient ? (
          <>
            <li>
              <Link to='/client-login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/client-register'>
                <FaUser /> Register
              </Link>
            </li>
          </>
        ) : (
          <>
            <li
              onClick={() => {
                setTypeUser(true);
                setTypeClient(false);
              }}
            >
              <CgGym /> GYM
            </li>
            <li
              onClick={() => {
                setTypeUser(false);
                setTypeClient(true);
              }}
            >
              <GiBodyBalance /> Client
            </li>
          </>
        )}
        <ConfirmationModal
          show={showAdminConfirmationModal}
          headerText='Admin login'
          handleClose={hideModal}
          openPos={Pos.CM_TOP_CENTER}
          containerWidth='50%'
          showButtons={false}
          closeBtn={true}
          handleCloseModal={handleCloseModal}
        >
          <LoginAdmin />
        </ConfirmationModal>
      </ul>
      {qrReader && (
        <div style={{ width: '100%' }}>
          <QrReader
            delay={1000}
            style={previewStyle}
            onError={(e) => handleError(e)}
            onScan={(e) => handleScan(e)}
          />
        </div>
      )}
    </header>
  );
}

export default Header;
