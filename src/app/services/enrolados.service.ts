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
  statusRequest = true;
  respuesta: any;
  apiKey = 'cfdc7593-7124-4e9e-b078-f44c18cacef4';
  constructor(private db: DatabaseService,
    public network: Network,
    private http: HttpClient) { }

  enrol() {
      if (this.network.type !== 'none' && this.statusRequest) {
        console.log(this.network.type)
       this.db.getDatabaseState().subscribe(rdy => {
          if (rdy) {
            this.statusRequest = false;
            this.db.getUsers().subscribe(async usuarios => {
              this.users = usuarios;
              console.log(this.users);
              if (this.users.length > 0 && this.network.type !== 'none') {
                this.statusRequest = false;
                for await (let us of this.users) {
                  this.userPost = {
                    firstName: us.FirstName,
                    lastName: us.LastName,
                    tipoDoc: us.tipo_documento,
                    documento: us.documento.toString(),
                    aceptaTerminos: JSON.parse(us.acepta_terminos),
                    badgeId: us.badgeId.toString(),
                    image: us.imageUrl,
                    metadatos: us.metaDatos,
                    empresa: us.empresa,
                    regional: us.regional,
                    instalacion: us.instalacion,
                    origen: 2,
                   /*  ciudadOrigen: 'Bogota',
                    ciudad: 'Bogota',
                    ssno: `${us.tipo_documento}${us.documento.toString()}`,
                    idStatus: '',
                    status: '', */
                  };
                  console.log(this.userPost);
                   this.http.post(`https://bio01.qaingenieros.com/api/enrol/create_enrol?apiKey=${this.apiKey}`, this.userPost).subscribe(async res => {
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
                 // break;
                }
               this.statusRequest = true;
              } else {
                this.statusRequest = true;
                console.log('el arreglo local es vacio');
              } 
              
            });
          }
        });
      } else {
        console.log('no hay conexion');
      }
  }

}
