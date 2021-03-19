import { Injectable } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { take, map, switchMap } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { UrlBaseService } from './url-base.service';

const helper = new JwtHelperService();
const TOKEN_KEY = 'jwt-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: Observable<any>;
  private userData = new BehaviorSubject(null);
  respuesta: any;
  respuestaF = false;
  userInfo: any;
  AuthUrl = `sec/autenticar_usuario`;
  BaseUrl: any;
  VerifyUrl = `sec/verificar_usuario`;

  constructor(private storage: Storage, private http: HttpClient, private plt: Platform, private router: Router,
              private alertCtrl: AlertController, private url: UrlBaseService) { 
    this.loadStoredToken();
    this.BaseUrl = this.url.getUrlBase();
  }

  loadStoredToken() {
    let platformObs = from(this.plt.ready());
 
    this.user = platformObs.pipe(
      switchMap(() => {
        return from(this.storage.get(TOKEN_KEY));
      }),
      map(token => {
        if (token) {
          let decoded = helper.decodeToken(token); 
          this.userData.next(decoded);
          return true;
        } else {
          return null;
        }
      })
    );
  }

  login(credenciales: {client_id: string, client_secret: string }) {
   let data: Observable<any>;
    data = this.http.post(`${this.BaseUrl}${this.AuthUrl}`, credenciales);
    data.subscribe((res: any) => {
      this.respuestaF = res.success;
      this.respuesta = {
        token: res.token,
        expiresin: res.expiresin
      }
     this.userInfo = this.respuesta;
    }, res => {}, async() => {
      if (this.respuestaF === false || credenciales.client_id === '' || credenciales.client_secret === '') {
        console.log(': ', this.respuestaF);
        const alert = await this.alertCtrl.create({
          header: 'Login Failed',
          message: 'Credenciales invalidas',
          buttons: ['OK'],
          mode: 'ios'
        });
        await alert.present();
        return of(null);
      }else{
        this.respuestaF = true;
        console.log('this.respuesta: ', this.respuesta, this.respuestaF);
      }
    });
    
    return this.http.post(`${this.BaseUrl}${this.AuthUrl}`, credenciales).pipe(
      take(1),
      map((res: any) => {
        return `${res.token}`;
      }),
      switchMap(token => {
        let decoded = helper.decodeToken(token);
        /* console.log('decoded: ', decoded); */
        this.userData.next(decoded);
        /* if(this.respuestaF === false  || credenciales.client_id === '' || credenciales.client_secret === ''){
          return of (null);
        } */
        let storageObs = from(this.storage.set(TOKEN_KEY, token));
        return storageObs;
      })
      
    );
  }

  getUser() {
    return this.userInfo;
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.router.navigateByUrl('/login');
      this.userData.next(null);
      this.userInfo === '';
    });
  }
}