import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';
import { EnroladosService } from './services/enrolados.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public network: Network,
    private enrolamientos: EnroladosService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.enrolamientos.enrol();
      this.network.onConnect().subscribe(() => {
        console.log(': Hay wifi en la app', );
        this.enrolamientos.enrol();
       });
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}