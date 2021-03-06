// Libs
// import { create } from 'apisauce';
import axios from 'axios';

// Config
import { URL_API } from '@app/configs/constants';

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
    timeout: 60000,
    headers: { Accept: 'application/vnd.github.v3+json' },
    params: {  apiKey: 'KErCGXtKF-MGFBe1zwvuhokNVTcyLaOTjwitc4AXsuj6rvDto3yDPjhUpRHOuU1SMjSw2jCztkANGxtwC7IbTg' }
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
  // apiCustom.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`;

  return apiCustom;
};

export default api;
