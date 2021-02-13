import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import * as moment from 'moment';
import { DatabaseService } from '@app/services/database.service';
import { FormBuilder } from '@angular/forms';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: "app-private-data",
  templateUrl: "./private-data.page.html",
  styleUrls: ["./private-data.page.scss"],
})
export class PrivateDataPage implements OnInit {
  /**
   * style del contenedor
   */
  stylesContainer: {
    "margin-top.px": number;
  };

  userData: any;
  user: any;
  base64: any = "";
  base64_1: any;
  base64_3: any;
  base64_2: any = "";
  estado: any;
  motivos: any;
  apiKey = "cfdc7593-7124-4e9e-b078-f44c18cacef4";
  appV: string;
  uniqueDeviceId: string;
  userPost: any;

  constructor(
    private toast: ToastController,
    private camera: Camera,
    private http: HttpClient,
    private fileTransfer: FileTransfer,
    private db: DatabaseService,
    private route: ActivatedRoute,
    private router: Router,
    private alertCtrl: AlertController,
    private network: Network,
    private loadingController: LoadingController,
    private auth: AuthService,
    private appVersion: AppVersion,
    private udid: UniqueDeviceID
  ) {}

  ngOnInit() {
    this.appVersion.getVersionNumber().then((versionNumber) => {
      this.appV = versionNumber;
      console.log(this.appV);
    });

    this.udid.get().then((uuid: any) => {
      this.uniqueDeviceId = uuid;
      console.log(this.uniqueDeviceId);
    });

    this.stylesContainer = {
      'margin-top.px': window.innerHeight / 4
    };
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.user = this.router.getCurrentNavigation().extras.state.user;
        console.log(this.user);
        // Se recomienda manejar esto con una clase o una interfaz
        this.userData = {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          tipoDoc: this.user.tipoDoc,
          documento: this.user.documento,
          aceptaTerminos: this.user.policyQuestions,
          ssno: this.user.ssno,
          image: '',
          metadatos: '', 
          empresa: this.user.empresa,
          regional: this.user.regional,
          instalacion: this.user.instalacion,
          origen: this.user.origen,
          step_enrol: this.user.step_enrol
        };
        this.userPost = {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          tipoDoc: this.user.tipoDoc,
          documento:  this.user.documento,
          aceptaTerminos: this.user.policyQuestions,
          ssno: this.user.ssno,
          image: '',
          metadatos: '',
          empresa: this.user.empresa,
          regional: this.user.regional,
          instalacion: this.user.instalacion,
          origen: 2,
          step_enrol: 1
          /* ciudadOrigen: 'Bogota',
          ciudad: 'Bogota',
          ssno: `${this.user.tipo_documento}${this.user.documento.toString()}`,
          idStatus: '',
          status: '', */
        };
      }
    });
  }

  logOut() {
    this.auth.logout();
  }
  /* takePhoto() {
    const options: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    this.camera.getPicture(options).then((imageData) => {
      this.image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });
  }*/

  /*takePhoto() {
    const options: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    this.camera.getPicture(options).then((imageData) => {
      this.userData.imageUrl = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });
  }*/

  takePhoto() {  
    if(this.network.type !== 'none'){
      console.log(': hay conexión: ', this.network.type);

      const options: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.CAMERA,
        correctOrientation: true,
        targetWidth: 1152,
        targetHeight: 2048,
      };
  
      this.camera.getPicture(options).then(
        (imageData) => {
          this.userData.image = imageData;
          this.uploadImage();
        },
        (err) => {
          console.log(err);
        }
      );
    }else{
      
console.log(': no hay conexión: ', this.network.type);
      const options: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.CAMERA,
        correctOrientation: true,
        targetWidth: 1152,
        targetHeight: 2048,
      };
  
      this.camera.getPicture(options).then(
        (imageData) => {
          this.base64_2 = 'data:image/jpeg;base64,' + imageData;          
          console.log('this.base64_2: ', this.base64_2);
         this.uploadImageOFFLINE();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  /*uploadImage(){
    let imageUrl = `https://testsanti.000webhostapp.com/phpserver/json1.php`;
    let postData = new FormData();
    console.log(this.base64Image);
    postData.append('file', this.base64Image);
    let data: Observable<any> = this.http.post(imageUrl, postData);
    data.subscribe((res) => {
      console.log(res);
    })
  }*/
  async uploadImageOFFLINE(){
    const alert = await this.alertCtrl.create({
      header: 'Se procesará la imagen cuando tenga acceso a internet.',
      buttons: ["OK"],
      mode: "ios",
    });
    await alert.present();
    }
  async uploadImage() {
    console.log(this.userData.image);
    const Transfer: FileTransferObject = this.fileTransfer.create();
    let options: FileUploadOptions = {
      fileKey: "file",
      fileName: ".jpg",
      chunkedMode: false,
      params: {doc: this.userData.documento}
      //httpMethod: 'post',
      //mimeType: "image/jpeg",
      //headers: {},
    };
    const loading = await this.loadingController.create({
      cssClass: "loading",
      message: "Por favor espere...",
      spinner: "dots",
      mode: "ios",
    });
    await loading.present();

    Transfer.upload(
      this.userData.image,
      `https://bio01.qaingenieros.com/api/img?apiKey=${this.apiKey}`,
      options
    ).then(
      async (data) => {
        loading.dismiss();
        this.base64 = data.response;

        this.base64_1 = JSON.parse(this.base64);
        console.log(this.base64_1);
        this.motivos = this.base64_1.motivos;
        this.estado = this.base64_1.status;

        if (this.estado === "rechazado") {
          const alert = await this.alertCtrl.create({
            header:
              "Imagen rechazada, por favor tome una nueva fotografía.\n" +
              this.motivos,
            buttons: ["OK"],
            mode: "ios",
          });
          await alert.present();
          this.base64_2 = "";
          this.stylesContainer = {
            "margin-top.px": window.innerHeight / 4,
          };
        } else {
          const alert = await this.alertCtrl.create({
            header: "Imagen aprobada, puede continuar.",
            buttons: ["OK"],
            mode: "ios",
          });
          await alert.present();
          this.base64_3 = this.base64_1.image;
          this.base64_2 = "data:image/png;base64," + this.base64_1.image;
          this.stylesContainer = undefined;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addUserDetails() {
    if(this.network.type !== 'none'){
    this.userData.image = this.base64_2;
    this.userData.imagensinbase64 = this.base64_3;
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.userData,
      },
    };
    this.router.navigate(["confirm-data"], navigationExtras);
  }else{
    this.userData.image = this.base64_2 ;
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.userData,
      },
    };
    this.router.navigate(["confirm-data"], navigationExtras);
  }
  }


  async sendUser() {
    const fecha = moment().format("YYYY-MM-DD");
    const hora = moment().format("LTS");

    const metaDatos = {
      Fecha: fecha,
      Hora: hora,
      versionTxt: "0.1",
      Usuario_activo: "Santiago",
      app_version: this.appV,
      udid: this.uniqueDeviceId
    };
    this.userData.metadatos = JSON.stringify(metaDatos);
    this.userPost.metadatos = JSON.stringify(metaDatos);
    this.userPost.image = this.base64_3;
    console.log(this.userData);
    /*this.http.post('https://bio01.qaingenieros.com/api/enrol/create_enrol', this.userPost).subscribe(res => {
      console.log(res);
    })*/
    if(this.network.type !== 'none'){
    this.db
      .addUserData(
        this.userData.firstName,
        this.userData.lastName,
        this.userData.tipoDoc,
        this.userData.documento,
        JSON.stringify(this.userData.aceptaTerminos),
        this.userData.ssno,
        this.base64_3,
        this.userData.metadatos,
        this.userData.empresa,
        this.userData.regional,
        this.userData.instalacion,
        this.userData.origen,
        this.userData.step_enrol
      )
      .then((_) => {
        this.userData = {
          firstName: "",
          lastName: "",
          tipoDoc: "",
          documento: "",
          aceptaTerminos: "",
          ssno: "",
          image: "",
          metadatos: {},
          empresa: "",
          regional: '',
          instalacion: '',
          origen: "",
          step_enrol: ''
        };
        this.userPost = {
          firstName: "",
          lastName: "",
          tipoDocumento: "",
          documento: "",
          aceptaTerminos: "",
          ssno: "",
          image: "",
          metadatos: "",
          empresa: "",
          regional: "",
          instalacion: "",
          origen: "",
          step_enrol: ''
        };
      });
    }else{
      this.db
      .addUserData(
        this.userData.firstName,
        this.userData.lastName,
        this.userData.tipoDoc,
        this.userData.documento,
        JSON.stringify(this.userData.aceptaTerminos),
        this.userData.ssno,
        this.base64_2,
        this.userData.metadatos,
        this.userData.empresa,
        this.userData.regional,
        this.userData.instalacion,
        this.userData.origen,
        this.userData.step_enrol
      )
      .then((_) => {
        this.userData = {
          firstName: "",
          lastName: "",
          tipoDoc: "",
          documento: "",
          aceptaTerminos: "",
          ssno: "",
          image: "",
          metadatos: {},
          empresa: "",
          regional: '',
          instalacion: '',
          origen: "",
          step_enrol: ''
        };
        this.userPost = {
          firstName: "",
          lastName: "",
          tipoDocumento: "",
          documento: "",
          aceptaTerminos: "",
          ssno: "",
          image: "",
          metadatos: "",
          empresa: "",
          regional: "",
          instalacion: "",
          origen: "",
          step_enrol: ''
        };
      });
      }
    const alert = await this.alertCtrl.create({
      header: "Los datos han sido registrados, muchas gracias.",
      buttons: ["OK"],
      mode: "ios",
    });
    await alert.present();
    this.router.navigate(["user-data"]);
  }
}
