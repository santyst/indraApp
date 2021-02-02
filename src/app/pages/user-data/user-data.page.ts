// Libs
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AnimationController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

// Constants
import { TIME_ANIMATION_GENERAL } from '@constantsAPP';

// Models
import TypeDocument, { TypeDocumentRServer, TypeDocumentStorage } from '@models/user/typeDocument';

// Services
import { EnroladosService } from '@services/enrolados.service';
import { DatabaseService, User } from '@services/database.service';
import { AuthService } from '@services/auth.service';
import UserProvider from '@services/api/user';
import { Network } from '@ionic-native/network/ngx';

const URL_PATH = 'src/app/pages/user-data/user-data.page.ts';
const STOEMPRESA = 'empresas';
const STOREGIONAL = 'regionales';
const STOINSTALACION = 'instalaciones';

@Component({
  selector: "app-user-data",
  templateUrl: "./user-data.page.html",
  styleUrls: ["./user-data.page.scss"],
})
export class UserDataPage implements OnInit {
  @ViewChild("containerLogin", { read: ElementRef }) containerLogin: ElementRef;
  @ViewChild("headerLogin", { read: ElementRef }) headerLogin: ElementRef;

  /**
   * los dimensiones del logo ecopetrol, y header del formulario, se adapta al
   * size de la pantalla del dispositivo.
   */
  styleSvgs: {
    widthLogo: number;
    heightLogo: number;
    widthHeader: number;
    heightHeader: number;
    windowH: number;
    windowW: number;
    /**
     * ancho de cargando
     */
    wL: number;
    /**
     * alto de cargando
     */
    hL: number;
  };

  baseUrl = `https://bio01.qaingenieros.com/api/enrol/`;
  apiKey = `?apiKey=cfdc7593-7124-4e9e-b078-f44c18cacef4`;
  empresas = `get-empresas`;
  regionales = `get-regionales`;
  instalaciones = `get-instalaciones`;
  base64 = "data:image/png;base64,";
  usersT: User[] = [];
  documentTypes: TypeDocument[];
  empresasArr: any;
  regionalesArr: any;
  instalacionesArr: any;
  instalacionShow = false;

  datasForm = this.formBuilder.group({
    FirstName: ["", [Validators.required]],
    LastName: ["", [Validators.required]],
    tipo_documento: ["", [Validators.required]],
    documento: ["", [Validators.required]],
    badgeId: ["", [Validators.required]],
    regional: ["", [Validators.required]],
    instalacion: ["", [Validators.required]],
    empresa: ["", [Validators.required]],
  });

  constructor(
    private toast: ToastController,
    private router: Router,
    private db: DatabaseService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private http: HttpClient,
    private animationCtrl: AnimationController,
    private enrolamientos: EnroladosService,
    private storage: Storage,
    private network: Network
  ) {
    this.documentTypes = [];
    this.styleSvgs = {
      widthLogo: (window.innerWidth / 4) * 3,
      heightLogo: ((window.innerWidth / 4) * 3) / 2.5,
      widthHeader: (window.innerWidth * 89) / 100,
      heightHeader: (window.innerHeight * 89) / 100 / 4,
      hL: window.innerWidth / 4,
      wL: window.innerWidth / 4,
      windowW: window.innerWidth,
      windowH: window.innerHeight
    };
  }

  userData = {
    FirstName: '',
    LastName: '',
    tipo_documento: '',
    documento: '',
    badgeId: '',
    empresa: '',
    regional: '',
    instalacion: ''
  };
  // Start lifecycle events
  ngOnInit() {
    this.loadData();
  }

  ionViewWillEnter() {
    this.animationStart();
    // this.enrolamientos.enrol();
    if (this.network.type !== 'none') {
      console.log('this.network.type : ', this.network.type);
      this.http.get(`${this.baseUrl}${this.empresas}${this.apiKey}`).subscribe((company: any) => {
        this.empresasArr = company.data;
        this.storage.set(STOEMPRESA, this.empresasArr);
        console.log('this.empresasArr: ', this.empresasArr);
      });
      this.http.get(`${this.baseUrl}${this.regionales}${this.apiKey}`).subscribe((region: any) => {
        this.regionalesArr = region.data;
        this.storage.set(STOREGIONAL, this.regionalesArr);
        console.log('this.regionalesArr: ', this.regionalesArr);
      });
      this.http.get(`${this.baseUrl}${this.instalaciones}${this.apiKey}&regional=`).subscribe((region: any) => {
        this.storage.set(STOINSTALACION, region.data);
      });
    } else {
      this.storage.get(STOEMPRESA).then((empresa: any) => {
        this.empresasArr = empresa;
        console.log('this.empresasArr: ', this.empresasArr);
      });
      this.storage.get(STOREGIONAL).then((regional: any) => {
        this.regionalesArr = regional;
        console.log('this.regionalesArr: ', this.regionalesArr);
      });
    }
  }

  ionViewWillLeave() {
    this.animationEnd();
  }
  // End lifecycle events
  EventRegional(event) {
    this.instalacionShow = true;
    this.userData.instalacion = '';
    console.log('Seleccionaste la regional', event.target.value);
    if (this.network.type !== 'none') {
      this.http.get(`${this.baseUrl}${this.instalaciones}${this.apiKey}&regional=${event.target.value}`).subscribe((instalacion: any) => {
        this.instalacionesArr = instalacion.data;
        console.log('this.instalacionesArr: ', this.instalacionesArr);
      });
    } else {
      this.storage.get(STOINSTALACION).then((instalacion: any) => {
        let arregloInstalacion2 = [];
        arregloInstalacion2 = instalacion;
        this.instalacionesArr = arregloInstalacion2.filter(inst => inst.Regional === event.target.value);
        console.log('this.instalacionesArr: ', this.instalacionesArr);
      });
      /* arregloInstalacion2.filter(inst => {
        console.log('inst: ', inst);
      }) */
    }
  }
  /**
   * @description Se encarga de correr las animaciones de entrada de los
   * elementos del login.page
   */
  animationStart() {
    if (this.containerLogin && this.headerLogin) {
      const headerUpAnimation = this.animationCtrl
        .create("animation-container-login")
        .addElement(this.headerLogin.nativeElement)
        .keyframes([
          { offset: 0, transform: "rotateY(90deg)" },
          { offset: 1, transform: "rotateY(0deg)" },
        ]);

      const containerUpAnimation = this.animationCtrl
        .create("animation-container-login")
        .addElement(this.containerLogin.nativeElement)
        .keyframes([
          { offset: 0, transform: "rotateY(90deg)" },
          { offset: 1, transform: "rotateY(0deg)" },
        ]);

      const animationUp = this.animationCtrl
        .create("animationUp")
        .addAnimation([containerUpAnimation, headerUpAnimation])
        .duration(TIME_ANIMATION_GENERAL)
        .easing("ease-in");

      animationUp.play();
    }
  }

  /**
   * @description Se encarga de correr las animaciones de salida de los
   * elementos del login.page
   */
  animationEnd() {
    if (this.containerLogin && this.headerLogin) {
      const headerUpAnimation = this.animationCtrl
        .create("animation-container-login")
        .addElement(this.headerLogin.nativeElement)
        .keyframes([
          { offset: 0, transform: "rotateY(0deg)" },
          { offset: 1, transform: "rotateY(90deg)" },
        ]);

      const containerUpAnimation = this.animationCtrl
        .create("animation-container-login")
        .addElement(this.containerLogin.nativeElement)
        .keyframes([
          { offset: 0, transform: "rotateY(0deg)" },
          { offset: 1, transform: "rotateY(90deg)" },
        ]);

      const animationUp = this.animationCtrl
        .create("animationUp")
        .addAnimation([containerUpAnimation, headerUpAnimation])
        .duration(TIME_ANIMATION_GENERAL)
        .easing("ease-out");

      animationUp.play();
    }
  }

  async loadData() {
    try {
      const { data, status } = await UserProvider.getAllTypeDocument();
      if (status === 200) {
        if (data.data.length) {
          this.documentTypes = data.data.map((type: TypeDocumentRServer) => new TypeDocument(TypeDocument.formatData(type)));
          this.storage.set("documentTypes", this.documentTypes);
        }
      } else {
        console.log(URL_PATH, 'loadData()', '{ data, status }', { data, status });
      }
    } catch (err) {
      const documentTypesS  = await this.storage.get("documentTypes");
      if (documentTypesS) {
        this.documentTypes = documentTypesS.map((documentType: TypeDocumentStorage) => new TypeDocument(documentType.data));
      }
      console.log('this.documentTypes: ', this.documentTypes);

      console.log(URL_PATH, 'loadData()', 'err', err);
    }
  }

  sendUser() {
    const navigationExtras: NavigationExtras = {
      state: {
        user: this.userData,
      },
    };
    this.router.navigate(["policy-question"], navigationExtras);
    this.userData = {
      FirstName: '',
      LastName: '',
      tipo_documento: '',
      documento: '',
      badgeId: '',
      empresa: '',
      instalacion: '',
      regional: '',
    };
  }

  logOut() {
    this.auth.logout();
  }
}
