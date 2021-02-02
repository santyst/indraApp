import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';
import { AlertController, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AnimationController } from '@ionic/angular';
import { EnroladosService } from '@app/services/enrolados.service';
import * as moment from 'moment';

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
   expiration: any;
   styleSvgs: {
    widthLogo: number;
    heightLogo: number;
    widthHeader: number;
    heightHeader: number;
  };

  credenciales = {
    client_id: '',
    client_secret: ''
  };

  constructor(private router: Router, private auth: AuthService, private alertCtrl: AlertController, public network: Network,
              private loadingController: LoadingController, private animationCtrl: AnimationController, private enrolamientos: EnroladosService) {
                this.styleSvgs = {
                  widthLogo: (window.innerWidth / 4) * 3,
                  heightLogo: ((window.innerWidth / 4) * 3) / 2.5,
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
    this.auth.login(this.credenciales).
    subscribe(async res => {
      if (res) {
        this.router.navigate(['user-data']);
        this.credenciales = {
          client_secret: '',
          client_id: ''
        };
        let expirationMin = 60/60;
        let expireDate = moment().add(expirationMin, 'minute');
        this.expiration = setInterval(async() => {
          let now = moment();
          let timeleft = 0;
          timeleft = expireDate.diff(now);
          console.log('timeleft: ', timeleft);
          if(timeleft < 0){
            this.auth.logout();
            const alert = await this.alertCtrl.create({
              header: 'Sesión expirada',
              message: 'Su sesión ha expirado, por favor ingrese nuevamente',
              buttons: ['OK'],
              mode: 'ios'
            });
            await alert.present();
            clearInterval(this.expiration);
          }
        }, 60000);
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
