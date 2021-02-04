import { Component, ModuleWithComponentFactories, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import * as moment from 'moment';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-confirm-data',
  templateUrl: './confirm-data.page.html',
  styleUrls: ['./confirm-data.page.scss'],
})
export class ConfirmDataPage implements OnInit {


  user: any;
  userData: any;
  userPost: any;
  documentType = [];
  uniqueDeviceId: any
  protected app_version: string;

  constructor(private db: DatabaseService, private route: ActivatedRoute, private router: Router, private alertCtrl: AlertController,
              private appVersion: AppVersion, private udid: UniqueDeviceID, private http: HttpClient) { }

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
          acepta_terminos: this.user.acepta_terminos,
          badgeId: this.user.badgeId,
          imageUrl: this.user.imageUrl,
          imagen: this.user.imagensinbase64,
          metaDatos: {},
          empresa: this.user.empresa,
          regional: this.user.regional,
          instalacion: this.user.instalacion
        };
        this.userPost = {
          firstName: this.user.FirstName,
          lastName: this.user.LastName,
          tipoDocumento: this.user.tipo_documento,
          documento:  this.user.documento.toString(),
          aceptaTerminos: this.user.acepta_terminos,
          badgeId: this.user.badgeId.toString(),
          image: this.user.imagensinbase64,
          metadatos: '',
          empresa: this.user.empresa,
          regional: this.user.regional,
          instalacion: this.user.instalacion,
          origen: 2,
          /* ciudadOrigen: 'Bogota',
          ciudad: 'Bogota',
          ssno: `${this.user.tipo_documento}${this.user.documento.toString()}`,
          idStatus: '',
          status: '', */
        };
        this.documentType.push(this.userData.tipo_documento);
      }
    });
  }

  async sendUser() {
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
    this.userPost.Metadatos = JSON.stringify(metaDatos);
    console.log(this.userPost);
    /*this.http.post('https://bio01.qaingenieros.com/api/enrol/create_enrol', this.userPost).subscribe(res => {
      console.log(res);
    })*/
    this.db.addUserData(this.userData.FirstName, this.userData.LastName, this.userData.tipo_documento, this.userData.documento, JSON.stringify(this.userData.acepta_terminos),
      this.userData.badgeId, this.userData.imagen, this.userData.metaDatos, this.userData.empresa, this.userData.regional, this.userData.instalacion).then(_ => {
        
        this.userData = {
          FirstName: '',
          LastName: '',
          tipo_documento: '',
          documento: '',
          acepta_terminos: '',
          badgeId: '',
          imageUrl: '',
          metaDatos: {},
          empresa: ''
        };
        this.userPost = {
          firstName: '',
          lastName: '',
          tipoDocumento: '',
          documento: '',
          aceptaTerminos: '',
          badgeId: '',
          image: '',
          metadatos: '',
          empresa: '',
          regional: '',
          instalacion: '',
          origen: '',
          /* ciudadOrigen: '',
          ssno: '',
          ciudad: '',
          idStatus: '',
          status: '', */
        };
      });
    const alert = await this.alertCtrl.create({
      header: 'Los datos han sido registrados, muchas gracias.',
      buttons: ['OK'],
      mode: 'ios'
    });
    await alert.present();
    this.router.navigate(['user-data']);
  }
  dontSendUser() {
    this.router.navigate(['user-data']);
    this.userData = {
      FirstName: '',
      LastName: '',
      tipo_documento: '',
      documento: '',
      acepta_terminos: '',
      badgeId: '',
      imageUrl: '',
      metaDatos: {},
      empresa: ''
    };
  }
}
