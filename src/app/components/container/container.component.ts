// Libs
import { Component, ViewChild, ElementRef, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { NgStyle } from '@angular/common';

// Services
import { AuthService } from '@services/auth.service';

// Constants
import { TIME_ANIMATION_GENERAL, TIME_DELAY_GENERAL } from '@app/configs/constants';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('headerEcopetrol', { read: ElementRef }) headerEcopetrol: ElementRef;
  @ViewChild('container', { read: ElementRef })  container: ElementRef;
  /**
   * style de contenedor.
   */
  @Input() styleContent?: NgStyle;
  /**
   * indica si el contenido esta listo para ser mostrado
   */
  @Input() conditionalContent?: boolean;

  /**
   * los dimensiones del logo ecopetrol se adapta al size de la pantalla del
   * dispositivo
   */
  styleSvgs: {
    widthLogo: number;
    heightLogo: number;
    hW: number;
    wW: number;
    hL: number;
    wL: number;
  };
  /**
   * Children dentro del tablero.
   */
  childrenContent: Element;

  constructor(private animationCtrl: AnimationController, private auth: AuthService) {
    this.conditionalContent = true;
    this.styleSvgs = {
      widthLogo: (window.innerWidth / 4) * 3,
      heightLogo: ((window.innerWidth / 4) * 3) / 2.5,
      hW: window.innerHeight,
      wW: window.innerWidth,
      hL: window.innerWidth / 4,
      wL: window.innerWidth / 4
    };
  }

  // Start lifecycle events
  ngAfterViewInit() {
    this.entranceAnimation();
  }

  ngOnDestroy() {
    this.exitAnimation();
  }
  // End lifecycle events

  /******************* Start funciones de animaciones ********************/
  /**
   * @description Se encarga de correr las animaciones de entrada de los
   * elementos
   */
  entranceAnimation() {
    if (this.headerEcopetrol && this.container) {
      const headerUpAnimation = this.animationCtrl.create()
        .addElement(this.headerEcopetrol.nativeElement)
        .keyframes([
          { offset: 0, transform: 'rotateY(90deg)' },
          { offset: 1, transform: 'rotateY(0deg)' }
        ]);

      const containerUpAnimation = this.animationCtrl.create()
        .addElement(this.container.nativeElement)
        .keyframes([
          { offset: 0, transform: 'rotateY(90deg)' },
          { offset: 1, transform: 'rotateY(0deg)' }
        ]);

      const animationUp = this.animationCtrl.create()
        .addAnimation([ containerUpAnimation, headerUpAnimation ])
        .delay(TIME_DELAY_GENERAL)
        .easing('ease-in')
        .duration(TIME_ANIMATION_GENERAL);
      animationUp.play();
    }
  }

  /**
   * @description Se encarga de correr las animaciones de salida de los
   * elementos
   */
  exitAnimation() {
    if (this.headerEcopetrol) {
      const headerOutAnimation = this.animationCtrl
        .create('animation-header-ecopetrol')
        .addElement(this.headerEcopetrol.nativeElement)
        .keyframes([
          { offset: 0, transform: 'rotateY(0deg)' },
          { offset: 1, transform: 'rotateY(90deg)' },
        ])
        .duration(TIME_ANIMATION_GENERAL)
        .easing('ease-out');
      headerOutAnimation.play();
    }
  }

  logOut(){
    this.auth.logout();
  }
}
