/**
 * Estructura del las políticas usada en la APP
 */
export interface PolicyQuestionsModel {
  text: string;
  version: number;
  question: string;
  type: number;
}

/**
 * Estructura de las políticas que llegan del servidor
 */
export interface PolicyQuestionsRServer {
  texto: string;
  pregunta: string;
  version: number;
  tipo: number;
}

/**
 * @description clase de las políticas del tratamiento de datos
 * que se usan en la APP.
 * @method formatData formate la data que llega del servidor a la que se
 * maneja en la APP. es Static.
 */
class PolicyQuestions {
  data: PolicyQuestionsModel;

  constructor(data: PolicyQuestionsModel) {
    this.data = data;
  }

  /**
   * @method formatData
   * @description formatea la data que llega del servidor a la que se maneja en
   * la APP.
   */
  static formatData(data: PolicyQuestionsRServer): PolicyQuestionsModel | undefined {
    try {
      const formattedData: PolicyQuestionsModel = {
        text: data.texto,
        version: data.version,
        question: data.pregunta,
        type: data.tipo
      };
      return formattedData;
    } catch (err) {
      console.log('src/app/models/PolicyQuestions', 'formatData()', 'err', err);
      return undefined;
    }
  }
}

export default PolicyQuestions;
