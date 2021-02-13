// Libs
import { AxiosResponse } from 'axios';

// Api
import api from '@services/api';

/**
 * @description toda las conexiones relacionadas con los usuarios en el API.
 * @method getAllTypeDocument se obtiene todos los tipos de documentos usados
 * en la APP.
 */
class UserProvider {
  /**
   * @method  getAllTypeDocument
   * @description se obtiene todos los tipos de documentos usados en la APP.
   */
  static async getAllTypeDocument(): Promise<AxiosResponse<any>> {
    return await api().get('enrol/get-tipos');
  }
}

export default UserProvider;
