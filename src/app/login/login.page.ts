import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
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
export class LoginPage implements OnInit, AfterViewInit {
  @ViewChild('containerForm', { read: ElementRef }) containerForm: ElementRef;
  /**
   * los estilos del logo ecopetrol
   */
  styleLogo: {
    width: number;
    height: number;
    marginHorizontal: number;
  };

  credenciales = {
    email: '',
    password: ''
  };

  constructor(private router: Router, private auth: AuthService, private alertCtrl: AlertController, public network: Network,
              private loadingController: LoadingController, private animationCtrl: AnimationController) {
                this.styleLogo = {
                  width: window.innerWidth / 2,
                  height: (window.innerWidth / 2) / 2.5,
                  marginHorizontal: window.innerWidth / 4
                };
              }

  ngOnInit() {
  }

  async ngAfterViewInit() {
    // animations
    await this.animationStart();
  }

  async animationStart() {
    if (this.containerForm) {
      console.log('entro entro');
      const loadingAnimation = this.animationCtrl.create('loading-animation')
        .addElement(this.containerForm.nativeElement)
        .duration(500)
        .delay(2500)
        .iterations(1)
        .fromTo('transform', 'scale(0.4)', 'scale(1)');
        // Don't forget to start the animation!
      loadingAnimation.play();
    } else {
      console.log('no entro');
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
