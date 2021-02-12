import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';

// Models
import PolicyQuestion, { PolicyQuestionRServer } from '@models/policyQuestion';

// Services
import PolicyQuestionProvider from '@services/api/policyQuestion';

@Component({
  selector: 'app-bioseguridad',
  templateUrl: './bioseguridad.page.html',
  styleUrls: ['./bioseguridad.page.scss'],
})
export class BioseguridadPage implements OnInit {
  @ViewChild('containerBiosecurity', { read: ElementRef }) containerLogin: ElementRef;
  @ViewChild('headerBiosecurity', { read: ElementRef }) headerLogin: ElementRef;

  /**
   * los dimensiones del logo ecopetrol se adapta al size de la pantalla del
   * dispositivo
   */
  styleSvgs: {
    widthLogo: number;
    heightLogo: number;
  };

  /**
   * preguntas de las políticas
   */
  questions: Array<PolicyQuestion>;
  /**
   * pregunta de la política actual donde esta el usuario
   */
  questionCurrent: PolicyQuestion;
  /**
   * index
   */
  index: number;

user: any;
userData: any;
bioseguridad: any = '';
txt: any;
texto: any;
pregunta: any;
version: any;
  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,
              private http: HttpClient, private animationCtrl: AnimationController) {
    this.questions = [];
    this.index = 0;
    this.styleSvgs = {
      widthLogo: window.innerWidth / 2,
      heightLogo: (window.innerWidth / 2) / 2.5
    };
  }

  // Start lifecycle events
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
          ssno: '',
          imageUrl: '',
          metaDatos: {},
          empresa: 'Ecopetrol'
        };
      }
    });

    this.loadQuestions();

    this.http.get(`https://bio01.qaingenieros.com/api/enrol/get-politicas?apiKey=cfdc7593-7124-4e9e-b078-f44c18cacef4`).subscribe((res: any) => {
      this.txt = res.data[1];
      console.log(this.txt);
      this.texto = this.txt.texto;
      this.pregunta = this.txt.pregunta;
      this.version = this.txt.version; 
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
   * @description carga las preguntas desde el servidor, que se le an de hacer
   * al enrolado.
   */
  async loadQuestions() {
    try {
      const { data, status } = await PolicyQuestionProvider.getPolicyEnrol();
      if (status === 200) {
        console.log('{ data, status }', { data, status });
        if (data.data.length) {
          this.questions = data.data.map((question: PolicyQuestionRServer) => new PolicyQuestion(PolicyQuestion.formatData(question)));
          this.questionCurrent = this.questions[this.index];
          console.log('%%%%%%%%%', this.questions);
        }
      } else {
        console.log('No fue posible optener las respuestas');
      }
    } catch (err) {
        console.log('loadQuestions()', 'err', err);
    }
  }

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
