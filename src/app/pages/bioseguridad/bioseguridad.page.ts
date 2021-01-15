import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-bioseguridad',
  templateUrl: './bioseguridad.page.html',
  styleUrls: ['./bioseguridad.page.scss'],
})
export class BioseguridadPage implements OnInit {
user: any;
userData: any;
bioseguridad: any = '';
txt: any;
texto: any;
pregunta: any;
version: any;
  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private http: HttpClient) { }

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
          acepta_bioseguridad: '',
          badgeId: '',
          imageUrl: '',
          metaDatos: {},
          empresa: 'Ecopetrol'
        };
      }
    });
    this.http.get(`https://bio01.qaingenieros.com/api/enrol/get-politicas`).subscribe((res: any) => {
      this.txt = res.data[1];
      console.log(this.txt);
      this.texto = this.txt.texto;
      this.pregunta = this.txt.pregunta;
      this.version = this.txt.version; 
    });
  }
  bioseguridadForm = this.formBuilder.group({
    bioseguridad: ['', [Validators.required]]
  });
  
  Formulario(){
    this.userData.acepta_bioseguridad = JSON.parse(this.bioseguridad);
      let navigationExtras: NavigationExtras = {
        state: {
          user: this.userData
        }
      };
      this.router.navigate(['herramientas'], navigationExtras);
      console.log(this.userData);
}
}
