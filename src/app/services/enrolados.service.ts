import { Injectable } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Network } from '@ionic-native/network/ngx';
import { HttpClient } from '@angular/common/http';
import { DatabaseService, User } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class EnroladosService {
  destroy1 = new Subject();
  rxjsTimer1 = timer(0, 10000);
  users: User[];
  userPost: any;
  respuesta1: any;
  respuesta: any;
  apiKey = 'cfdc7593-7124-4e9e-b078-f44c18cacef4';
  constructor(private db: DatabaseService,
    public network: Network,
    private http: HttpClient) { }

  enrol() {

    this.rxjsTimer1.pipe(takeUntil(this.destroy1)).subscribe(() => {
      if (this.network.type !== 'none') {
        console.log(this.network.type)

        this.db.getDatabaseState().subscribe(rdy => {
          if (rdy) {
            this.db.getUsers().subscribe(usuarios => {
              this.users = usuarios;
              console.log(this.users);
              if (this.users.length > 0 && this.network.type !== 'none') {
                for (let us of this.users) {
                  this.userPost = {
                    firstName: us.FirstName,
                    lastName: us.LastName,
                    tipoDocumento: us.tipo_documento,
                    documento: us.documento.toString(),
                    aceptaTerminos: JSON.parse(us.acepta_terminos),
                    badgeId: us.badgeId.toString(),
                    image: us.imageUrl,
                    metadatos: us.metaDatos,
                    empresa: us.empresa,
                    ssno: `${us.tipo_documento}${us.documento.toString()}`,
                    idStatus: '',
                    status: '',
                    regional: 1,
                    instalacion: 1,
                    ciudad: 'Bogota',
                    origen: 'App',
                    ciudadOrigen: 'Bogota'
                  };
                  console.log(this.userPost);
                  this.http.post(`https://bio01.qaingenieros.com/api/enrol/create_enrol?apiKey=${this.apiKey}`, this.userPost).subscribe(res => {
                    this.respuesta = res;
                    this.respuesta1 = this.respuesta.success;
                    console.log(this.respuesta);

                    if (this.respuesta1 === true) {
                      console.log('datos subidos');
                      this.userPost = {};
                      this.db.deleteUser(us.userId).then(_ => {
                      });
                    }
                  });
                }
              } else {
                console.log('el arreglo local es vacio');
              }
            });
          }
        });
      } else {
        console.log('no hay conexion');
      }

    });
  }

}
