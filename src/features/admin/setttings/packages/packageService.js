import { api } from '../../../../services/ApiService';

const API_URL = '/api/clients/';

const setPackagePrices = async (packagePricesData) => {
  const response = await api.post(
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
  const response = await api.get(API_URL + 'get-package-prices', config);

  return response.data;
};

const packagePriceService = {
  setPackagePrices,
  getPackagePrices,
};

export default packagePriceService;
