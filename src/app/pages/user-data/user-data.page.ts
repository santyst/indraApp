import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { DatabaseService, User } from './../../services/database.service';
import { NavigationExtras, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.page.html',
  styleUrls: ['./user-data.page.scss'],
})
export class UserDataPage implements OnInit {
  @ViewChild('containerLogin', { read: ElementRef }) containerLogin: ElementRef;
  @ViewChild('headerLogin', { read: ElementRef }) headerLogin: ElementRef;

  /**
   * los dimensiones del logo ecopetrol, y header del formulario, se adapta al
   * size de la pantalla del dispositivo.
   */
  styleSvgs: {
    widthLogo: number;
    heightLogo: number;
    widthHeader: number;
    heightHeader: number;
  };

  base64 = 'data:image/png;base64,';
  userData = {};
  usersT:  User[] = [];
  tipo: any;

  datasForm = this.formBuilder.group({
    FirstName: ['', [Validators.required]],
    LastName: ['', [Validators.required]],
    tipo_documento: ['', [Validators.required]],
    documento: ['', [Validators.required]]
  });

  constructor(private toast: ToastController, private router: Router, private db: DatabaseService, private formBuilder: FormBuilder,
              private auth: AuthService, private http: HttpClient, private animationCtrl: AnimationController) {
                this.styleSvgs = {
                  widthLogo: window.innerWidth / 2,
                  heightLogo: (window.innerWidth / 2) / 2.5,
                  widthHeader: (window.innerWidth * 89) / 100,
                  heightHeader: ((window.innerHeight * 89) / 100) / 4
                };
              }

  // Start lifecycle events
  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getUsers().subscribe(usuarios => {
          this.usersT = usuarios;
          console.log(this.usersT);
        });
      }
    });
    this.http.get(`https://bio01.qaingenieros.com/api/enrol/get-tipos?apiKey=cfdc7593-7124-4e9e-b078-f44c18cacef4`).subscribe((res: any) => {
     console.log(res);
     this.tipo = res.data;
     console.log(this.tipo);
    });
  }

  ionViewWillEnter() {
    this.animationStart();
  }

  ionViewWillLeave() {
    this.animationEnd();
  }
  // End lifecycle events

  /**
   * @description Se encarga de correr las animaciones de entrada de los
   * elementos del login.page
   */
  animationStart() {
    if (this.containerLogin && this.headerLogin) {
      const headerUpAnimation = this.animationCtrl.create('animation-container-login')
        .addElement(this.headerLogin.nativeElement)
        .keyframes([
          { offset: 0, transform: 'rotateY(90deg)' },
          { offset: 1, transform: 'rotateY(0deg)' }
        ]);

      const containerUpAnimation = this.animationCtrl.create('animation-container-login')
        .addElement(this.containerLogin.nativeElement)
        .keyframes([
          { offset: 0, transform: 'rotateY(90deg)' },
          { offset: 1, transform: 'rotateY(0deg)' }
        ]);

      const animationUp = this.animationCtrl.create('animationUp')
        .addAnimation([ containerUpAnimation, headerUpAnimation ])
        .duration(400)
        .easing('ease-in');

      animationUp.play();
    }
  }

  /**
   * @description Se encarga de correr las animaciones de salida de los
   * elementos del login.page
   */
  animationEnd() {
    if (this.containerLogin && this.headerLogin) {
      const headerUpAnimation = this.animationCtrl.create('animation-container-login')
        .addElement(this.headerLogin.nativeElement)
        .keyframes([
          { offset: 0, transform: 'rotateY(0deg)' },
          { offset: 1, transform: 'rotateY(90deg)' }
        ]);

      const containerUpAnimation = this.animationCtrl.create('animation-container-login')
        .addElement(this.containerLogin.nativeElement)
        .keyframes([
          { offset: 0, transform: 'rotateY(0deg)' },
          { offset: 1, transform: 'rotateY(90deg)' }
        ]);

      const animationUp = this.animationCtrl.create('animationUp')
        .addAnimation([ containerUpAnimation, headerUpAnimation ])
        .duration(400)
        .easing('ease-out');

      animationUp.play();
    }
  }

  sendUser(){
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.userData
      }
    };
    this.router.navigate(['bioseguridad'], navigationExtras);
    this.userData = {};
  }
  logOut(){
    this.auth.logout();
   }
}
