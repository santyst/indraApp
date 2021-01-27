// Libs
// import { create } from 'apisauce';
import axios from 'axios';

// Config
import { URL_API } from '@constantsAPP';

// Params API
interface ApiParams {
  url?: string;
  v2?: boolean;
  v3?: boolean;
  headers?: any;
}

/**
 * Define the api.
 */
const api = (params?: ApiParams) => {
  const apiCustom = axios.create({
    baseURL: params?.url ? params.url : URL_API,
    timeout: 1000,
    headers: { Accept: 'application/vnd.github.v3+json' },
    params: {  apiKey: 'cfdc7593-7124-4e9e-b078-f44c18cacef4' }
  });

  if (params?.headers) {
    Object.assign(apiCustom.defaults.headers.common, params.headers);
  }

  if (params?.v2) {
    apiCustom.defaults.headers.common['Accept'] = 'application/vnd.api.v2+json';
  }

  if (params?.v3) {
    apiCustom.defaults.headers.common['Accept'] = 'application/vnd.api.v3+json';
  }

  // Usado en caso de tener tokens en la solicitudes
  // apiCustom.defaults.headers.common['Authorization'] = ;

  return apiCustom;
};

export default api;
