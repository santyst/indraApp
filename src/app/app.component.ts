import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DatabaseService, User } from './services/database.service';

import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Network } from '@ionic-native/network/ngx';
import { HttpClient } from '@angular/common/http';
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
    this.enrolamientos.enrol();
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}