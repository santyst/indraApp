import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tratamiento-datos',
  templateUrl: './tratamiento-datos.page.html',
  styleUrls: ['./tratamiento-datos.page.scss'],
})
export class TratamientoDatosPage implements OnInit {

user: any; 
terminos: any;
userData: any;

  constructor(private router: Router, private auth: AuthService, private route: ActivatedRoute, private db: DatabaseService,
              private alertCtrl: AlertController) { }

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
          carnet: 'No',
          terminos: '',
          foto: 'No'
        };
      }
    });
  
  }
  
async alert(){
  const alert = await this.alertCtrl.create({
    header: 'Usuario registrado',
    buttons: ['OK'],
    mode: 'ios'
  });
  await alert.present();
}

  Formulario(){
    this.userData.terminos = this.terminos;
    if(this.userData.terminos === 'Acepta terminos'){
      let navigationExtras: NavigationExtras = {
        state: {
          user: this.userData
        }
      };
      this.router.navigate(['private-data'], navigationExtras);
      console.log(this.userData);
    }
    else {
      this.router.navigate(['user-data']);
        this.db.addUserData(this.userData.nombre, this.userData.apellido, this.userData.documento, this.userData.numeroDoc, this.userData.carnet, this.userData.terminos, this.userData.foto).then(_ => {
        });
        this.alert();
        this.router.navigate(['user-data']);
        console.log(this.userData);
    }
  }

  
  logOut(){
   this.auth.logout();
  }

}
