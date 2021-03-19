import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlBaseService {

  constructor() { }

  getUrlBase(){
    return `https://tstbio01.ecopetrol.com.co/api/`;
  }
}
