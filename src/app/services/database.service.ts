import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';



export interface User {
  userId: number;
  FirstName: string;
  LastName: string;
  tipo_documento: string;
  documento: number;
  acepta_terminos: string;
  badgeId: number;
  imageUrl: string;
  metaDatos: string;
  empresa: number;
  regional: number;
  instalacion: number;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  users = new BehaviorSubject([]);
  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient,
              ) {
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
            FirstName: data.rows.item(i).FirstName,
            LastName: data.rows.item(i).LastName,
            tipo_documento: data.rows.item(i).tipo_documento,
            documento: data.rows.item(i).documento,
            acepta_terminos: data.rows.item(i).acepta_terminos,
            badgeId: data.rows.item(i).badgeId,
            imageUrl: data.rows.item(i).imageUrl,
            metaDatos: data.rows.item(i).metaDatos,
            empresa: data.rows.item(i).empresa,
            regional: data.rows.item(i).regional,
            instalacion: data.rows.item(i).instalacion,
          });
        }
      }
      this.users.next(users);
    });
  }
  addUserData(userFirstName, userLastName, usertipo_documento, userdocumento, useracepta_terminos, userbadgeId, userimageUrl, usermetaDatos, userempresa, userregional, userinstalacion) {
    let data = [userFirstName, userLastName, usertipo_documento, userdocumento, useracepta_terminos, userbadgeId, userimageUrl, usermetaDatos, userempresa, userregional, userinstalacion];
    return this.database.executeSql('INSERT INTO Users (FirstName, LastName, tipo_documento, documento, acepta_terminos, badgeId, imageUrl, metaDatos, empresa, regional, instalacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', data).then(data => {
      this.loadUsers();
    });
  }
  getUserById(id): Promise<User> {
    return this.database.executeSql('SELECT * FROM Users WHERE userId = ?', [id]).then(data => {
      return {
        userId: data.rows.item(0).userId,
        FirstName: data.rows.item(0).FirstName,
        LastName: data.rows.item(0).LastName,
        tipo_documento: data.rows.item(0).tipo_documento,
        documento: data.rows.item(0).documento,
        acepta_terminos: data.rows.item(0).acepta_terminos,
        badgeId: data.rows.item(0).badgeId,
        imageUrl: data.rows.item(0).imageUrl,
        metaDatos: data.rows.item(0).metaDatos,
        empresa: data.rows.item(0).empresa,
        regional: data.rows.item(0).regional,
        instalacion: data.rows.item(0).instalacion,
      };
    });
  }
  updateUser(user: User) {
    let data = [user.FirstName, user.LastName, user.tipo_documento, user.documento, user.acepta_terminos, user.badgeId, user.imageUrl, user.metaDatos, user.empresa, user.regional, user.instalacion];
    return this.database.executeSql(`UPDATE Users SET FirstName = ?, LastName = ?, tipo_documento = ?, documento = ?, acepta_terminos = ?, badgeId = ?, imageUrl = ?, metaDatos = ?, empresa = ?, regional = ?, instalacion = ? WHERE userId = ${user.userId}`, data).then(data => {
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
