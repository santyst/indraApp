import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-private-data',
  templateUrl: './private-data.page.html',
  styleUrls: ['./private-data.page.scss'],
})
export class PrivateDataPage implements OnInit {
  userData: any;
  user: any;
  base64: any = '';
  base64_1: any; 
  base64_3: any; 
  base64_2: any = ''; 
  estado: any; 
  motivos: any;
  apiKey = 'cfdc7593-7124-4e9e-b078-f44c18cacef4';

  constructor(private camera: Camera, private http: HttpClient, private fileTransfer: FileTransfer,
    private route: ActivatedRoute, private router: Router, private alertCtrl: AlertController,
    private loadingController: LoadingController, private auth: AuthService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
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
          //acepta_terminos: this.user.acepta_terminos,
          badgeId: this.user.badgeId,
          imageUrl: '', 
          empresa: this.user.empresa,
          regional: this.user.regional,
          instalacion: this.user.instalacion
        };
      }
    });
  }
  logOut(){
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
      targetHeight: 2048
    }

    this.camera.getPicture(options).then((imageData) => {
      this.userData.imageUrl = imageData;
      this.uploadImage();
    }, (err) => {
      console.log(err);
    });
  }


  addUserDetails() {
    this.userData.imageUrl = this.base64_2;
    this.userData.imagensinbase64 = this.base64_3;
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.userData
      }
    };
    this.router.navigate(['confirm-data'], navigationExtras);
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
      fileKey: 'file',
      fileName: '.jpg',
      chunkedMode: false,
      //httpMethod: 'post',
      //mimeType: "image/jpeg",
      //headers: {},
    }
    const loading = await this.loadingController.create({
      cssClass: 'loading',
      message: 'Por favor espere...',
      spinner: 'dots',
      mode: 'ios'
    });
    await loading.present();

     Transfer.upload(this.userData.imageUrl, (`https://bio01.qaingenieros.com/api/img?apiKey=${this.apiKey}`), options)
      .then(async(data) => {
        loading.dismiss();
        this.base64 = data.response;
        
        this.base64_1 = JSON.parse(this.base64);
        console.log(this.base64_1);
        this.motivos = this.base64_1.motivos;
        this.estado = this.base64_1.status;

        if(this.estado === 'rechazado'){
          const alert = await this.alertCtrl.create({
            header: 'Imagen rechazada, por favor tome una nueva fotografía.\n' + this.motivos,
            buttons: ['OK'],
            mode: 'ios'
          });
          await alert.present();
          this.base64_2 = '';
        }else{
          const alert = await this.alertCtrl.create({
            header: 'Imagen aprobada, puede continuar.',
            buttons: ['OK'],
            mode: 'ios'
          });
          await alert.present();
        this.base64_3 = this.base64_1.image;
        this.base64_2 = 'data:image/png;base64,' + this.base64_1.image;
        }
      }, (err) => {
        console.log(err);
      });
  } 
}
