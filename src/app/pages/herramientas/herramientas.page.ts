import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-herramientas',
  templateUrl: './herramientas.page.html',
  styleUrls: ['./herramientas.page.scss'],
})
export class HerramientasPage implements OnInit {
  user: any;
  userData: any;
  herramientas: any;
  constructor(private route: ActivatedRoute ,private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
    if (this.router.getCurrentNavigation().extras.state) {
      this.user = this.router.getCurrentNavigation().extras.state.user;
      console.log(this.user);
      this.userData = {
        FirstName: this.user.FirstName,
        LastName: this.user.LastName,
        tipo_documento: this.user.tipo_documento,
        documento: this.user.documento,
        acepta_bioseguridad: this.user.acepta_bioseguridad,
        acepta_herramientas: '',
        badgeId: '',
        imageUrl: '',
        metaDatos: {},
        empresa: 'Ecopetrol'
      };
    }
  });
  }
  herramientasForm = this.formBuilder.group({
    herramientas: ['', [Validators.required]]
  });
  Formulario(){
    this.userData.acepta_herramientas = JSON.parse(this.herramientas);
      let navigationExtras: NavigationExtras = {
        state: {
          user: this.userData
        }
      };
      this.router.navigate(['tratamiento-datos'], navigationExtras);
      console.log(this.userData);
}
}
