import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  token = '';
  loading = false;

  constructor(
    public http: HttpClient,
    public storage: Storage,
  ) { }


  getToken() {
    this.storage.get('loginData').then((val) => {
      if (val) {
        this.token = val.keyToken;
      }
    });
  }

  serviceStarted() {
    this.loading = true;
  }

  serviceCompleted() {
    this.loading = false;
  }

  getData(path: any): Observable<any> {
    const header = new HttpHeaders({
      Authorization: 'Basic ' + this.token,
    });
    return this.http.get(path, { headers: header });
  }

  postData(path: any, body: any) {
    const header = new HttpHeaders({
      Authorization: 'Basic ' + this.token,
    });
    return this.http.post(path, body, { headers: header });
  }

  login(path: any, body: any): Observable<any> {
    return this.http.post(path, body);
  }

  errorMethod(err: any) {
    window.alert('OOPS!, Error')
  }

}
