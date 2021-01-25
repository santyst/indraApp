import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import * as moment from 'moment';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-tratamiento-datos',
  templateUrl: './tratamiento-datos.page.html',
  styleUrls: ['./tratamiento-datos.page.scss'],
})
export class TratamientoDatosPage implements OnInit {

user: any; 
terminos: any = '';
userData: any;
uniqueDeviceId: any;
txt: any;
texto: any;
texto2: any;
pregunta: any;
version: any;
protected app_version: string;

  constructor(private router: Router, private route: ActivatedRoute, private db: DatabaseService,
              private alertCtrl: AlertController, private appVersion: AppVersion, private udid: UniqueDeviceID, 
              private formBuilder: FormBuilder, private http: HttpClient) { }

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
          acepta_herramientas: this.user.acepta_herramientas,
          acepta_bioseguridad: this.user.acepta_bioseguridad,
          badgeId: '',
          imageUrl: '',
          metaDatos: {},
          empresa: 'Ecopetrol'
        };
      }
    });
    this.http.get(`https://bio01.qaingenieros.com/api/enrol/get-politicas?apiKey=cfdc7593-7124-4e9e-b078-f44c18cacef4`).subscribe((res: any) => {
      this.txt = res.data[2];
      console.log(this.txt);
      this.texto = this.txt.texto;
      var texto1 = this.texto.replace('\r\n',"</br>");
      this.texto2 = texto1;
      this.pregunta = this.txt.pregunta;
      this.version = this.txt.version; 
    });
  }
  terminosForm = this.formBuilder.group({
    terminos: ['', [Validators.required]]
  });
async alert(){
  const alert = await this.alertCtrl.create({
    cssClass: 'alerta1',
    header: 'Registramos su decisión, muchas gracias.',
    message: '<img src = "../../assets/images/avatar-profile.png" class="alertimg">',
    buttons: [{
      text: 'OK',
      cssClass: 'boton',
      handler: data => {
        console.log('presioné ok');
      }
    }],
    mode: 'ios'
  });
  await alert.present();
}

  Formulario(){
    this.userData.acepta_terminos = JSON.parse(this.terminos);
    if(this.userData.acepta_terminos === true && this.userData.acepta_bioseguridad === true && this.userData.acepta_herramientas === true){
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

}
