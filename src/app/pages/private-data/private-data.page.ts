import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { DatabaseService, User } from './../../services/database.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import * as moment from 'moment';

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
    private formBuilder: FormBuilder,
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
          FirstName: this.user.FirstName,
          LastName: this.user.LastName,
          tipo_documento: this.user.tipo_documento,
          documento: this.user.documento,
          acepta_terminos: this.user.policyQuestions,
          badgeId: this.user.badgeId,
          imageUrl: "",
          empresa: "Ecopetrol",
        };
      }
    });
  }

  datasForm = this.formBuilder.group({
    badgeId: ["", [Validators.required]],
  });
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
        this.userData.imageUrl = imageData;
        this.uploadImage();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addUserDetails() {
    this.userData.imageUrl = this.base64_2;
    this.userData.imagensinbase64 = this.base64_3;
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.userData,
      },
    };
    this.router.navigate(["confirm-data"], navigationExtras);
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
  async uploadImage() {
    console.log(this.userData.imageUrl);
    const Transfer: FileTransferObject = this.fileTransfer.create();
    let options: FileUploadOptions = {
      fileKey: "file",
      fileName: ".jpg",
      chunkedMode: false,
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
      this.userData.imageUrl,
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
    this.userData.metaDatos = JSON.stringify(metaDatos);
    this.userPost.Metadatos = JSON.stringify(metaDatos);
    console.log(this.userPost);
    /*this.http.post('https://bio01.qaingenieros.com/api/enrol/create_enrol', this.userPost).subscribe(res => {
      console.log(res);
    })*/
    this.db
      .addUserData(
        this.userData.FirstName,
        this.userData.LastName,
        this.userData.tipo_documento,
        this.userData.documento,
        this.userData.acepta_terminos,
        this.userData.badgeId,
        this.userData.imagen,
        this.userData.metaDatos,
        this.userData.empresa
      )
      .then((_) => {
        this.userData = {
          FirstName: "",
          LastName: "",
          tipo_documento: "",
          documento: "",
          acepta_terminos: "",
          badgeId: "",
          imageUrl: "",
          metaDatos: {},
          empresa: "",
        };
        this.userPost = {
          firstName: "",
          lastName: "",
          tipoDocumento: "",
          documento: "",
          aceptaTerminos: "",
          badgeId: "",
          image: "",
          metadatos: "",
          empresa: "",
          ssno: "",
          idStatus: "",
          status: "",
          regional: "",
          instalacion: "",
          ciudad: "",
          origen: "",
          ciudadOrigen: "",
        };
      });
    const alert = await this.alertCtrl.create({
      header: "Los datos han sido registrados, muchas gracias.",
      buttons: ["OK"],
      mode: "ios",
    });
    await alert.present();
    this.router.navigate(["user-data"]);
  }
}
