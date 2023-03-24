import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setShowHomePage,
  setShowReportsPage,
  setShowSettingsPage,
  setShowAccountPage,
} from '../../../../features/admin/adminSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { showHomePage, showReportsPage, showSettingsPage, showAccountPage } =
  //   useSelector((state) => state.adminPages);

  function handleSidebarLink(page) {
    dispatch(setShowHomePage(page === 'home' ? true : false));
    dispatch(setShowReportsPage(page === 'reports' ? true : false));
    dispatch(setShowSettingsPage(page === 'settings' ? true : false));
    dispatch(setShowAccountPage(page === 'account' ? true : false));
    navigate(`/admin${page === 'home' ? '' : '/' + page}`);
  }

  return (
    <div className='sidebar'>
      <div className='sidebar-logo'>
        <p>LOGO</p>
      </div>
      <div className='sidebar-section'>
        <ul className='sidebar-ul'>
          <li
            className='sidebar-li-item'
            onClick={() => handleSidebarLink('home')}
          >
            Home
          </li>
          <li
            className='sidebar-li-item'
            onClick={() => handleSidebarLink('reports')}
          >
            Reports
          </li>
          <li
            className='sidebar-li-item'
            onClick={() => handleSidebarLink('settings')}
          >
            Settings
          </li>
          <li
            className='sidebar-li-item'
            onClick={() => handleSidebarLink('account')}
          >
            Account
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
