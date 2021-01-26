import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';
import { AlertController, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
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

  credenciales = {
    email: '',
    password: ''
  };

  constructor(private router: Router, private auth: AuthService, private alertCtrl: AlertController, public network: Network,
              private loadingController: LoadingController, private animationCtrl: AnimationController) {
                this.styleSvgs = {
                  widthLogo: window.innerWidth / 2,
                  heightLogo: (window.innerWidth / 2) / 2.5,
                  widthHeader: (window.innerWidth * 90) / 100,
                  heightHeader: ((window.innerHeight * 80) / 100) / 2.5
                };
              }

  // Start lifecycle events
  ngOnInit() {}

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

  async login() {
    const loading = await this.loadingController.create({
      message: 'Por favor espere...',
      mode: 'ios',
      spinner: 'dots'
    });

    this.auth.login(this.credenciales)
    .pipe(
      finalize(() => {
        loading.dismiss();
      })
    )
    .
    subscribe(async res => {
      if (res) {
        this.router.navigate(['user-data']);
      } else {
        const alert = await this.alertCtrl.create({
          header: 'Login Failed',
          message: 'Credenciales invalidas',
          buttons: ['OK'],
          mode: 'ios'
        });
        await alert.present();
      }
    });
  }

}
