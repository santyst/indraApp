import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';
import { AlertController, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credenciales = {
    email: '',
    password: ''
  };

  constructor(private router: Router, private auth: AuthService, private alertCtrl: AlertController, public network: Network,
              private loadingController: LoadingController) { }

  ngOnInit() {
   
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
