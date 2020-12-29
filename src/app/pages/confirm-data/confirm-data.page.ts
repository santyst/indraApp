import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-confirm-data',
  templateUrl: './confirm-data.page.html',
  styleUrls: ['./confirm-data.page.scss'],
})
export class ConfirmDataPage implements OnInit {


  user: any;
  userData: any;
  documentType = [];

  constructor(private db: DatabaseService, private route: ActivatedRoute, private router: Router, private alertCtrl: AlertController) { }

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
          foto: this.user.foto
        };
        this.documentType.push(this.userData.documento);
      }
    });
   
  }

  async sendUser() {
    this.db.addUserData(this.userData.nombre, this.userData.apellido, this.userData.documento, this.userData.numeroDoc, this.userData.carnet, this.userData.terminos, this.userData.foto).then(_ => {
      this.userData = {
        nombre: '',
        apellido: '',
        documento: '',
        numeroDoc: '',
        terminos: '',
        carnet: '',
        foto: ''
      };
    });
    const alert = await this.alertCtrl.create({
      header: 'Usuario registrado',
      buttons: ['OK'],
      mode: 'ios'
    });
    await alert.present();
    this.router.navigate(['user-data']);
  }
  dontSendUser(){
    this.router.navigate(['user-data']);
    this.userData = {
      nombre: '',
      apellido: '',
      documento: '',
      numeroDoc: '',
      terminos: '',
      carnet: '',
      foto: ''
    };
  }
}
