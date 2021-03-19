import { Injectable } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Network } from '@ionic-native/network/ngx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DatabaseService, User } from './database.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { UrlBaseService } from './url-base.service';

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
  cameraPhoto = false; 
  respuesta: any;
  imgStatus: any;
  apiKey = 'KErCGXtKF-MGFBe1zwvuhokNVTcyLaOTjwitc4AXsuj6rvDto3yDPjhUpRHOuU1SMjSw2jCztkANGxtwC7IbTg';
  imgURL = `http://bio01.qaingenieros.com:5000/base64`;
  base64: any;
  base64_1: any;
  motivos: any;
  estado: any;
  BaseUrl: any;

  constructor(private db: DatabaseService,
    public network: Network,
    private http: HttpClient,
    private alertCtrl: AlertController,
    private camera: Camera,
    private fileTransfer: FileTransfer,
    private loadingController: LoadingController, 
    private url: UrlBaseService) { 
      this.BaseUrl = this.url.getUrlBase();
      this.db.getDatabaseState().subscribe((ready: any) => {
        if(ready){
          this.db.getUsers().subscribe((usuarios) => {
          this.users = usuarios;
          });
        }
      })
    }

     /* enrol() {
      if (this.network.type !== 'none' && this.statusRequest && this.cameraPhoto == false) {
        console.log(this.network.type)
       let sub = this.db.getDatabaseState().subscribe(rdy => {
          if (rdy) {
            this.statusRequest = false;
            let sub2 = this.db.getUsers().subscribe(async usuarios => {
              this.users = usuarios;
              console.log(this.users);
              if (this.users.length > 0 && this.network.type !== 'none') {
                setTimeout(function() {
                  sub.unsubscribe();
                sub2.unsubscribe();
                }, 1000);
                this.statusRequest = false;
                for await (let us of this.users) {
                  var n = us.imageUrl.includes('base64');
                  if(n === true) {
                    console.log(': ',us);
                    let postImg = {
                      img: us.imageUrl,
                      doc: us.documento
                    }
                    this.http.post(`${this.imgURL}`, postImg).subscribe(async (res: any) => {
                      this.imgStatus = res.status;
                       if(this.imgStatus === 'rechazado'){
                          const alert = await this.alertCtrl.create({
                            backdropDismiss: false,
                            header: `La fotografía de ${us.firstName} ${us.lastName} con ${us.tipoDoc} #${us.documento} ha sido rechazada, por favor tome una nueva.`,
                            buttons: [
                            {text: 'Capturar',
                             handler: (data) => {
                               this.captureAgain(us);  
                             }
                            },
                            {text: 'Posponer'}],
                            mode: "ios",
                          });
                          await alert.present();
                      }else{
                        us.imageUrl = res.image;
                        this.db.updateUser(us);
                        setTimeout(function() {
                          sub.unsubscribe();
                        sub2.unsubscribe();
                        }, 1000);
                      } 
                    });
                  }else{

                  this.userPost = {
                    firstName: us.firstName,
                    lastName: us.lastName,
                    tipoDoc: us.tipoDoc,
                    documento: us.documento,
                    aceptaTerminos: JSON.parse(us.aceptaTerminos),
                    ssno: us.ssno,
                    image: us.imageUrl,
                    metadatos: us.metadatos,
                    empresa: us.empresa,
                    regional: us.regional,
                    instalacion: us.instalacion,
                    origen: us.origen,
                    step_enrol: us.step_enrol
                   /*  ciudadOrigen: 'Bogota',
                    ciudad: 'Bogota',
                    ssno: `${us.tipo_documento}${us.documento.toString()}`,
                    idStatus: '',
                    status: '',
                  };
                  console.log(this.userPost);
                   this.http.post(`${this.BaseUrl}enrol/create_enrol?apiKey=${this.apiKey}`, this.userPost).subscribe(async res => {
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
  } */

  enrol(){
    setTimeout(async() => {
      console.log(': users', this.users);
      if (this.network.type !== 'none' && this.statusRequest && this.cameraPhoto == false) {
        console.log(this.network.type);
        if (this.users.length > 0 && this.network.type !== 'none'){
          this.statusRequest = false;
          for await (let us of this.users) {
            var n = us.imageUrl.includes('base64');
            if(n === true) {
              console.log(': ',us);
              let postImg = {
                img: us.imageUrl,
                doc: us.documento
              }
              this.http.post(`${this.imgURL}`, postImg).subscribe(async (res: any) => {
                this.imgStatus = res.status;
                 if(this.imgStatus === 'rechazado'){
                    const alert = await this.alertCtrl.create({
                      backdropDismiss: false,
                      header: `La fotografía de ${us.firstName} ${us.lastName} con ${us.tipoDoc} #${us.documento} ha sido rechazada, por favor tome una nueva.`,
                      buttons: [
                      {text: 'Capturar',
                       handler: (data) => {
                         this.captureAgain(us);  
                       }
                      },
                      {text: 'Posponer'}],
                      mode: "ios",
                    });
                    await alert.present();
                }else{
                  us.imageUrl = res.image;
                  this.db.updateUser(us);
                } 
              });
            }else{
  
            this.userPost = {
              firstName: us.firstName,
              lastName: us.lastName,
              tipoDoc: us.tipoDoc,
              documento: us.documento,
              aceptaTerminos: JSON.parse(us.aceptaTerminos),
              ssno: us.ssno,
              image: us.imageUrl,
              metadatos: us.metadatos,
              empresa: us.empresa,
              regional: us.regional,
              instalacion: us.instalacion,
              origen: us.origen,
              step_enrol: us.step_enrol
             /*  ciudadOrigen: 'Bogota',
              ciudad: 'Bogota',
              ssno: `${us.tipo_documento}${us.documento.toString()}`,
              idStatus: '',
              status: '',*/
            };
            console.log(this.userPost);
             this.http.post(`${this.BaseUrl}enrol/create_enrol?apiKey=${this.apiKey}`, this.userPost).subscribe(async res => {
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
           // break;
          }
          this.statusRequest = true;
        }else {
          this.statusRequest = true;
          console.log('el arreglo local es vacio');
        } 
      }else{
        console.log('No hay conexión');
      }
    }, 2000);
    }

  captureAgain(user: User){
    this.cameraPhoto = true;
  console.log('user: ', user);
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
      let imagenFile = imageData;
      this.uploadImage(imagenFile, user);
    },
    (err) => {
      console.log(err);
    }
  );
  }

  async uploadImage(imagenFile, user: User){
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
      imagenFile,
      `${this.BaseUrl}img?apiKey=${this.apiKey}`,
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
            buttons: [{
              text: 'Repetir',
              handler: d => {
                this.captureAgain(user);
              }
            },
            {
             text: 'Cancelar',
             handler: data => {
               this.cameraPhoto = false;
             }
          }],
            mode: "ios",
          });
          await alert.present();
        } else {
          const alert = await this.alertCtrl.create({
            header: "La imagen ha sido aprobada.",
            buttons: ["OK"],
            mode: "ios",
          });
          await alert.present();
          user.imageUrl = this.base64_1.image;
          this.cameraPhoto = false;
          this.db.updateUser(user);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  
}