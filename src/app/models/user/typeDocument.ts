/**
 * Typo de documento manejado en la APP
 */
export interface TypeDocumentModel {
  code: string;
  description: string;
}

/**
 * Typo de cumento como llega del servidor
 */
export interface TypeDocumentRServer {
  codigo: string;
  descripcion: string;
}

export interface TypeDocumentStorage {
  data: TypeDocumentModel;
}

class TypeDocument {
  data: TypeDocumentModel;

  constructor(data: TypeDocumentModel) {
    this.data = data;
  }

  /**
   * @method formatData
   * @description formatea la data que llega del servidor a la que se maneja en
   * la APP.
   */
  static formatData(data: TypeDocumentRServer): TypeDocumentModel | undefined {
    try {
      const formattedData: TypeDocumentModel = {
        code: data.codigo,
        description: data.descripcion
      };
      return formattedData;
    } catch (err) {
      console.log('src/app/models/typeDocument.ts', 'formatData()', 'err', err);
      return undefined;
    }
  }
}

export default TypeDocument;
