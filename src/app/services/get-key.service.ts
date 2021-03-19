import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UrlBaseService } from './url-base.service';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class GetKeyService {

BaseUrl: any;
VerifyUrl = `sec/verificar_usuario`;
Userinfo: any;

  constructor(private auth: AuthService, private http: HttpClient, private url: UrlBaseService) { 
   this.BaseUrl = this.url.getUrlBase();
  }

  getKey(){
    let user = this.auth.getUser();
    let jsonVoid = {};
    const headers1 = new HttpHeaders({
      'Authorization': 'Bearer ' + user.token
    });
    let data: Observable<any>
    data = this.http.post(`${this.BaseUrl}${this.VerifyUrl}`, jsonVoid, {headers: headers1})
    data.subscribe((res1: any) => {
    });
  }
}
