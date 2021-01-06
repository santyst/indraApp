import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from '../../services/auth.service';
import * as moment from 'moment';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';


@Component({
  selector: 'app-tratamiento-datos',
  templateUrl: './tratamiento-datos.page.html',
  styleUrls: ['./tratamiento-datos.page.scss'],
})
export class TratamientoDatosPage implements OnInit {

user: any; 
terminos: any;
userData: any;
uniqueDeviceId: any
protected app_version: string;

  constructor(private router: Router, private auth: AuthService, private route: ActivatedRoute, private db: DatabaseService,
              private alertCtrl: AlertController, private appVersion: AppVersion, private udid: UniqueDeviceID) { }

  ngOnInit() {
    this.appVersion.getVersionNumber().then(versionNumber => {
      this.app_version = versionNumber;
      console.log(this.app_version);
    });
    this.udid.get().then((uuid: any) => {
     this.uniqueDeviceId = uuid
     console.log(this.uniqueDeviceId);
    });
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.user = this.router.getCurrentNavigation().extras.state.user;
        console.log(this.user);
        this.userData = {
          FirstName: this.user.FirstName,
          LastName: this.user.LastName,
          tipo_documento: this.user.tipo_documento,
          documento: this.user.documento,
          acepta_terminos: '',
          badgeId: 'No',
          imageUrl: 'No',
          metaDatos: {},
          empresa: 'Ecopetrol'
        };
      }
    });
  
  }
  
async alert(){
  const alert = await this.alertCtrl.create({
    header: 'Registramos su decisión, muchas gracias.',
    buttons: ['OK'],
    mode: 'ios'
  });
  await alert.present();
}

  Formulario(){
    this.userData.acepta_terminos = JSON.parse(this.terminos);
    if(this.userData.acepta_terminos === true){
      let navigationExtras: NavigationExtras = {
        state: {
          user: this.userData
        }
      };
      this.router.navigate(['private-data'], navigationExtras);
      console.log(this.userData);
    }
    else {
      let fecha = moment().format('YYYY-MM-DD');
      let hora = moment().format('LTS');

      let metaDatos = {
        Fecha: fecha,
        Hora: hora,
        versionTxt: '0.1',
        Usuario_activo: 'Santiago',
        app_version: this.app_version,
        udid: this.uniqueDeviceId
      }
      this.userData.metaDatos = JSON.stringify(metaDatos);

      this.router.navigate(['user-data']);
        this.db.addUserData(this.userData.FirstName, this.userData.LastName, this.userData.tipo_documento, this.userData.documento, this.userData.acepta_terminos,
          this.userData.badgeId, this.userData.imageUrl, this.userData.metaDatos, this.userData.empresa).then(_ => {
        });
        this.alert();
        this.router.navigate(['user-data']);
        console.log(this.userData);
    }
  }

  
  logOut(){
   this.auth.logout();
  }

}
