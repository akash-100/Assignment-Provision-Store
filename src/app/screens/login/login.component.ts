import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { finalize } from 'rxjs';
import { ApiService } from 'src/app/common/config/api.service';
import { DataService } from 'src/app/common/services/data.service';
const shajs = require('sha.js');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  btnDisabled = true;
  hide = true;
  loginData = {
    username: '',
    password: ''
  }
  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  constructor(
    public router: Router,
    public apiService: ApiService,
    public data: DataService,
    public storage: Storage
  ) { }

  ngOnInit(): void {
  }

  doSubmit(l: NgForm) {
    if (l.valid) {
      this.btnDisabled = false;
      // username: 'test45@yopmail.com',
      // password: 'Test@123',
      // grant_type: 'password'

      //*************Normal obj construction */
      const password = shajs('sha256').update(this.loginData.password).digest('hex')
      const obj = {
        username: this.loginData.username,
        password: password,
        grant_type: 'password'
      }

      //**************Manual obj contruction */
      const val = 'username=' + obj.username + '&password=' + obj.password + '&grant_type=password';

      //**************FormData Format obj contruction */
      const formData = new FormData();
      formData.append('username', obj.username);
      formData.append('password', obj.password);
      formData.append('grant_type', 'password');

      this.apiService
        .authenticateuser(formData)
        .subscribe(
          (success: any) => {
            console.log(success)
            //this.storage.set("userData", this.user);
            //this.data.token = success.token;
            //this.router.navigateByUrl('pages/product-list');
          }
        );
      this.router.navigateByUrl('pages/product-list');
    }
    else {
      this.btnDisabled = true;
    }
  }
}
