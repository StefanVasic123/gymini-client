import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Account from './account';
import Main from './main';
import Reports from './reports';
import Settings from './settings';
import { getShiftSettings } from '../../../../features/admin/setttings/shiftSettings/shiftSettingsSlice';
import { getPackagePrices } from '../../../../features/admin/setttings/packages/packageSlice';
import { getLastShift } from '../../../../features/shifts/shiftSlice';
import { getTodayCreatedClients } from '../../../../features/clients/clientSlice';

const Content = () => {
  const { showHomePage, showReportsPage, showSettingsPage, showAccountPage } =
    useSelector((state) => state.adminPages);

  const { user } = useSelector((state) => state.auth);

  const userId = user._id;

  const dispatch = useDispatch();

  dispatch(getShiftSettings(userId));
  dispatch(getPackagePrices(userId));
  dispatch(getLastShift(userId));
  dispatch(getTodayCreatedClients(userId));
  return (
    <div className='content'>
      {showHomePage ? <Main /> : null}
      {showReportsPage ? <Reports /> : null}
      {showSettingsPage ? <Settings /> : null}
      {showAccountPage ? <Account /> : null}
    </div>
  );
};

export default Content;
