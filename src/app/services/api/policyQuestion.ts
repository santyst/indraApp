// Libs
import { AxiosResponse } from 'axios';

// Api
import api from '@services/api';

/**
 * @description toda las conexiones relacionadas a los cursos en el API.
 * @method getAllCategories obtiene todas las categorías.
 */
class PolicyQuestionProvider {
  /**
   * @method getPolicyEnrol
   * @description Se obtienen las preguntas que el enrolado tiene que aceptar
   * o no en la APP.
   */
  static async getPolicyEnrol(): Promise<AxiosResponse<any>> {
    return await api().get('enrol/get-politicas');
  }
}

export default PolicyQuestionProvider;
