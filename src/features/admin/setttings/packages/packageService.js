import axios from 'axios';

const API_URL = '/api/clients/';

const setPackagePrices = async (packagePricesData) => {
  const response = await axios.post(
    API_URL + 'set-package-prices',
    packagePricesData
  );

  return response.data;
};

const getPackagePrices = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + 'get-package-prices', config);

  return response.data;
};

const packagePriceService = {
  setPackagePrices,
  getPackagePrices,
};

export default packagePriceService;
