import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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

  constructor(private router: Router, private auth: AuthService, private alertCtrl: AlertController) { }

  ngOnInit() {
  }
  
  login() {
    this.auth.login(this.credenciales).subscribe(async res => {
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
