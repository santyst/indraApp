/**
 * Estructura del las políticas usada en la APP
 */
export interface PolicyQuestionModel {
  /**
   * descripción de la pregunta
   */
  text: string;
  /**
   * version
   */
  version: number;
  /**
   * pregunta
   */
  question: string;
  /**
   * tipo de pregunta
   */
  type: number;
  /**
   * acepta la pregunta por defecto es no
   */
  accept?: boolean;
}

export interface PolicyQuestionStorage {
  data: PolicyQuestionModel;
}

/**
 * Estructura de las políticas que llegan del servidor
 */
export interface PolicyQuestionRServer {
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
class PolicyQuestion {
  data: PolicyQuestionModel;

  constructor(data: PolicyQuestionModel) {
    this.data = data;
  }

  /**
   * @method formatData
   * @description formatea la data que llega del servidor a la que se maneja en
   * la APP.
   */
  static formatData(data: PolicyQuestionRServer): PolicyQuestionModel | undefined {
    try {
      const formattedData: PolicyQuestionModel = {
        text: data.texto,
        version: data.version,
        question: data.pregunta,
        type: data.tipo,
        accept: undefined
      };
      return formattedData;
    } catch (err) {
      console.log('src/app/models/PolicyQuestions', 'formatData()', 'err', err);
      return undefined;
    }
  }

  static formatDataStorage(data: PolicyQuestionStorage) {
     return data.data;
  }

  /**
   * actcualiza en cambio de estado de la pregunta de si acepto a no acepto
   * y viceversa.
   */
  handleAccept(value?: boolean) {
    this.data.accept = value;
  }

  reponseServer() {
    return {
      tipoTexto: this.data.type,
      versionTexto: JSON.stringify(this.data.version),
      aceptaTexto: this.data.accept
    };
  }
}

export default PolicyQuestion;
