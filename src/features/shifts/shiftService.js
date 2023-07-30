import { api } from '../../services/ApiService';

const API_URL = '/api/clients/';

const closeShift = async (shiftData) => {
  const response = await api.post(API_URL + 'end-shift', shiftData);

  return response.data;
};

const getLastShift = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.get(API_URL + 'get-last-shift', config);

  return response.data;
};

// Delete shift
const deleteShift = async (shiftId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.delete(
    API_URL + 'delete-shift/' + shiftId,
    config
  );

  return response.data;
};

// Get shifts by date
const getShiftsByDate = async (shiftData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.post(
    API_URL + 'get-shifts-by-date',
    shiftData,
    config
  );

  return response.data;
};

const shiftService = {
  closeShift,
  getLastShift,
  deleteShift,
  getShiftsByDate,
};

export default shiftService;
