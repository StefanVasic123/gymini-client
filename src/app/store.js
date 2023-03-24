import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import clientReducer, {
  getClientsByDate,
  getClientsByMonth,
  getClientsByYear,
} from '../features/clients/clientSlice';
import addUserSlice from '../features/forms/addUserSlice';
import updateUserSlice from '../features/forms/updateUserSlice';
import modalReducer from '../features/modals/modalSlice';
import reportReducer from '../features/reports/reportSlice';
import adminSlice from '../features/admin/adminSlice';
import getShiftSettings from '../features/admin/setttings/shiftSettings/shiftSettingsSlice';
import getPackagePrices from '../features/admin/setttings/packages/packageSlice';
import endShiftNotificationSlice from '../features/notifications/endShiftNotificationSlice';
import getLastShift from '../features/shifts/shiftSlice';
import getShiftsByDate from '../features/shifts/shiftSlice';
import getTodayCreatedClients from '../features/clients/clientSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    clients: clientReducer,
    modals: modalReducer,
    reports: reportReducer,
    addUserFormData: addUserSlice,
    updateUserFormData: updateUserSlice,
    adminPages: adminSlice,
    shiftSettings: getShiftSettings,
    packagePrices: getPackagePrices,
    endShiftNotifications: endShiftNotificationSlice,
    lastShift: getLastShift,
    todayClients: getTodayCreatedClients,
    clientsByDate: getClientsByDate,
    clientsByMonth: getClientsByMonth,
    clientsByYear: getClientsByYear,
    shiftsByDate: getShiftsByDate,
  },
});
