import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  userId: number;
  nombre: string;
  apellido: string;
  documento: string;
  numeroDoc: string;
  carnet: number;
  terminos: string;
  foto: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  users = new BehaviorSubject([]);

  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'userDatabase.db',
        location: 'default',
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
        });
    });
  }

  seedDatabase() {
    this.http.get('assets/usuarios.sql', { responseType: 'text' })
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(_ => {
            this.loadUsers();
            this.dbReady.next(true);
          })
          .catch(e => console.error(e));
      });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getUsers(): Observable<User[]> {
    return this.users.asObservable();
  }
  loadUsers() {
    return this.database.executeSql('SELECT * FROM Users', []).then(data => {
      let users: User[] = [];

      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          users.push({
            userId: data.rows.item(i).userId,
            nombre: data.rows.item(i).nombre,
            apellido: data.rows.item(i).apellido,
            documento: data.rows.item(i).documento,
            numeroDoc: data.rows.item(i).numeroDoc,
            carnet: data.rows.item(i).carnet,
            terminos: data.rows.item(i).terminos,
            foto: data.rows.item(i).foto,
          });
        }
      }
      this.users.next(users);
    });
  }
  addUserData(userNombre, userApellido, userDocumento, userNumeroDoc, userCarnet, UserTerminos, userFoto ) {
    let data = [userNombre, userApellido, userDocumento, userNumeroDoc, userCarnet, UserTerminos, userFoto];
    return this.database.executeSql('INSERT INTO Users (nombre, apellido, documento, numeroDoc, carnet, terminos, foto) VALUES (?, ?, ?, ?, ?, ?, ?)', data).then(data => {
      this.loadUsers();
    });
  }
  getUserById(id): Promise<User> {
    return this.database.executeSql('SELECT * FROM Users WHERE userId = ?', [id]).then(data => {
      return {
        userId: data.rows.item(0).userId,
        nombre: data.rows.item(0).nombre,
        apellido: data.rows.item(0).apellido,
        documento: data.rows.item(0).apellido,
        numeroDoc: data.rows.item(0).numeroDoc,
        carnet: data.rows.item(0).carnet,
        terminos: data.rows.item(0).terminos,
        foto: data.rows.item(0).foto,
      };
    });
  }
  updateUser(user: User) {
    let data = [user.nombre, user.apellido, user.documento, user.numeroDoc, user.carnet, user.terminos, user.foto];
    return this.database.executeSql(`UPDATE Users SET nombre = ?, apellido = ?, documento = ?, numeroDoc = ?, carnet = ?, terminos = ?, foto = ? WHERE userId = ${user.userId}`, data).then(data => {
      this.loadUsers();
    });
  }
  deleteUser(userId) {
    console.log('Inside Deleting DB User Id ' + userId);
    return this.database.executeSql('DELETE FROM Users WHERE userId = ?', [userId]).then(_ => {
      this.loadUsers();
    });
  }

}
