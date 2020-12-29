import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { HttpClient } from '@angular/common/http';
import { AlertController, ToastController } from '@ionic/angular';
import { DatabaseService, User } from './../../services/database.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-private-data',
  templateUrl: './private-data.page.html',
  styleUrls: ['./private-data.page.scss'],
})
export class PrivateDataPage implements OnInit {
  userData: any;
  user: any;
 

  constructor(private toast: ToastController,private camera: Camera, private http: HttpClient, private fileTransfer: FileTransfer,
    private db: DatabaseService, private route: ActivatedRoute, private router: Router, private alertCtrl: AlertController,
    private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.user = this.router.getCurrentNavigation().extras.state.user;
        console.log(this.user);
        this.userData = {
          nombre: this.user.nombre,
          apellido: this.user.apellido,
          documento: this.user.documento,
          numeroDoc: this.user.numeroDoc,
          terminos: this.user.terminos,
          carnet: this.user.carnet,
          foto: ''
        };
      }
    });
  }
  
  datasForm = this.formBuilder.group({
    carnet: ['', [Validators.required]]
  });

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


  takePhoto() {
    const options: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    this.camera.getPicture(options).then((imageData) => {
      this.userData.foto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });
  }


  addUserDetails() {
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
  uploadImage() {
    console.log(this.userData.foto);
    const Transfer: FileTransferObject = this.fileTransfer.create();
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: '.jpg',
      chunkedMode: false,
      //httpMethod: 'post',
      //mimeType: "image/jpeg",
      //headers: {},
    }
     Transfer.upload(this.userData.foto, ('https://bio01.qaingenieros.com/api/img'), options)
      .then((data) => {
        console.log(data);
      }, (err) => {
        console.log(err);
      });
  } 
}
