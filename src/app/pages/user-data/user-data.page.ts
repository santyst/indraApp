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

const URL_PATH = 'src/app/pages/user-data/user-data.page.ts';

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

  base64 = "data:image/png;base64,";
  userData = {};
  usersT: User[] = [];
  documentTypes: TypeDocument[];

  datasForm = this.formBuilder.group({
    FirstName: ["", [Validators.required]],
    LastName: ["", [Validators.required]],
    tipo_documento: ["", [Validators.required]],
    documento: ["", [Validators.required]],
    badgeId: ["", [Validators.required]],
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
    private storage: Storage
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

  // Start lifecycle events
  ngOnInit() {
    this.loadData();
  }

  ionViewWillEnter() {
    this.animationStart();
    // this.enrolamientos.enrol();
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
      const { documentTypesS } = await this.storage.get("documentTypes");
      if (documentTypesS) {
        this.documentTypes = documentTypesS.map((documentType: TypeDocumentStorage) => new TypeDocument(documentType.data));
      }
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
    this.userData = {};
  }

  logOut() {
    this.auth.logout();
  }
}
