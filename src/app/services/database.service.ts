import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';



export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  tipoDoc: string;
  documento: string;
  aceptaTerminos: string;
  ssno: string;
  imageUrl: string;
  metadatos: string;
  empresa: number;
  regional: number;
  instalacion: number;
  origen: number;
  step_enrol: number;
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
            firstName: data.rows.item(i).firstName,
            lastName: data.rows.item(i).lastName,
            tipoDoc: data.rows.item(i).tipoDoc,
            documento: data.rows.item(i).documento,
            aceptaTerminos: data.rows.item(i).aceptaTerminos,
            ssno: data.rows.item(i).ssno,
            imageUrl: data.rows.item(i).imageUrl,
            metadatos: data.rows.item(i).metadatos,
            empresa: data.rows.item(i).empresa,
            regional: data.rows.item(i).regional,
            instalacion: data.rows.item(i).instalacion,
            origen: data.rows.item(i).origen,
            step_enrol: data.rows.item(i).step_enrol
          });
        }
      }
      this.users.next(users);
    });
  }
  addUserData(userfirstName, userlastName, usertipoDoc, userdocumento, useraceptaTerminos, userssno, userimageUrl, usermetadatos, userempresa, userregional, userinstalacion, userorigen, userstep_enrol) {
    let data = [userfirstName, userlastName, usertipoDoc, userdocumento, useraceptaTerminos, userssno, userimageUrl, usermetadatos, userempresa, userregional, userinstalacion, userorigen, userstep_enrol];
    return this.database.executeSql('INSERT INTO Users (firstName, lastName, tipoDoc, documento, aceptaTerminos, ssno, imageUrl, metadatos, empresa, regional, instalacion, origen, step_enrol) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', data).then(data => {
      this.loadUsers();
    });
  }
  getUserById(id): Promise<User> {
    return this.database.executeSql('SELECT * FROM Users WHERE userId = ?', [id]).then(data => {
      return {
        userId: data.rows.item(0).userId,
        firstName: data.rows.item(0).firstName,
        lastName: data.rows.item(0).lastName,
        tipoDoc: data.rows.item(0).tipoDoc,
        documento: data.rows.item(0).documento,
        aceptaTerminos: data.rows.item(0).aceptaTerminos,
        ssno: data.rows.item(0).ssno,
        imageUrl: data.rows.item(0).imageUrl,
        metadatos: data.rows.item(0).metadatos,
        empresa: data.rows.item(0).empresa,
        regional: data.rows.item(0).regional,
        instalacion: data.rows.item(0).instalacion,
        origen: data.rows.item(0).origen,
        step_enrol: data.rows.item(0).step_enrol
      };
    });
  }
  updateUser(user: User) {
    let data = [user.firstName, user.lastName, user.tipoDoc, user.documento, user.aceptaTerminos, user.ssno, user.imageUrl, user.metadatos, user.empresa, user.regional, user.instalacion, user.origen, user.step_enrol];
    return this.database.executeSql(`UPDATE Users SET firstName = ?, lastName = ?, tipoDoc = ?, documento = ?, aceptaTerminos = ?, ssno = ?, imageUrl = ?, metadatos = ?, empresa = ?, regional = ?, instalacion = ?, origen = ?, step_enrol = ? WHERE userId = ${user.userId}`, data).then(data => {
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
