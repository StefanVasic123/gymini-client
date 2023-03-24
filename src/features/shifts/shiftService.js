import axios from 'axios';

const API_URL = '/api/clients/';

const closeShift = async (shiftData) => {
  const response = await axios.post(API_URL + 'end-shift', shiftData);

  return response.data;
};

const getLastShift = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + 'get-last-shift', config);

  return response.data;
};

// Delete shift
const deleteShift = async (shiftId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log('deleteShiftService: ', shiftId, token);
  const response = await axios.delete(
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

  const response = await axios.post(
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
