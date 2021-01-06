import { Component} from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DatabaseService, User } from './services/database.service';

import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Network } from '@ionic-native/network/ngx';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  users: User[] = [];
  usuario: any;
  userPost: any;
  respuesta: any;
  respuesta1: any;
  destroy1 = new Subject();
  rxjsTimer1 = timer(0, 20000);
  disconnect: boolean;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private db: DatabaseService,
    public network: Network,
    private http: HttpClient
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.rxjsTimer1.pipe(takeUntil(this.destroy1)).subscribe(() => {
      if(this.network.type !== 'none'){
        console.log(this.network.type)
       
        this.db.getDatabaseState().subscribe(rdy => {
          if (rdy) {
            this.db.getUsers().subscribe(usuarios => {  
              this.users = usuarios;
              console.log(this.users);
              let i = this.users[0];
              if(this.users !== []){
              this.post(i);
              }
            });
          }
        });
        
      }else{
        console.log('no hay conexion');
        
      }

      });
    });
    
  }
  post(position){
    if(this.users !== []){
    this.userPost = {
      firstName: position.FirstName,
      lastName: position.LastName,
      tipoDocumento: position.tipo_documento,
      documento:  position.documento.toString(),
      aceptaTerminos: JSON.parse(position.acepta_terminos),
      badgeId: position.badgeId.toString(),
      image: position.imageUrl,
      metadatos: position.metaDatos,
      empresa: position.empresa,
      ssno: `${position.tipo_documento}${position.documento.toString()}`,
      idStatus: '',
      status: '',
      regional: 1,
      instalacion: 1,
      ciudad: 'Bogota',
      origen: 'App',
      ciudadOrigen: 'Bogota'
    };
    console.log(this.userPost);
    this.http.post('https://bio01.qaingenieros.com/api/enrol/create_enrol', this.userPost).subscribe(res => {
     this.respuesta = res;
     this.respuesta1 = this.respuesta.success;
     console.log(this.respuesta);
      
      if(this.respuesta1 === true){
        this.db.deleteUser(position.userId).then(_ => {
          this.userPost = '';
        });
        this.post(position);
      }
    }); 
  }
  }
}