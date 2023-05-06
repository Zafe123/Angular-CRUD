import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { matchpassword } from '../signup/matchpassword.validator';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit {



  hide = true;
  hidecurrent = true;
  hideditcurrent = true;
  hideditnew = true;
  isDisabled = true;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl(null, [Validators.required]);
  confirmpassword = new FormControl(null, [Validators.required]);
  userFullName: string = '';
  userEmail: string = '';
  userPassword: string = '';

  public userinfoForm!: FormGroup;
  public formSubmitted = false;


  constructor(private http: HttpClient, private _formBuilder: FormBuilder) {
    const userId = localStorage.getItem('userId');
    const usersUrl = 'http://localhost:3000/signupUsers';
    this.http.get<any[]>(usersUrl).subscribe(users => {
      const currentUser = users.find(user => user.id === Number(userId));
      if (currentUser) {
        this.userFullName = currentUser.fullname;
        this.userEmail = currentUser.email;
        this.userPassword = currentUser.password;
      }
    });
  }

  ngOnInit(): void {
    this.userinfoForm = this._formBuilder.group({
      fullname: [''],
      email: [''],
      currentpassword: [''],
      newpassword: [''],
      confirmpassword: ['']
    }, {
      validators: matchpassword

    })
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Invalid Email';
    }
    return '';
  }

  getpasswordErrorMessage() {
    if (this.confirmpassword.hasError('required')) {
      return 'Password should be same';
    }
    return '';
  }


  userinfo() {
    this.userinfoForm.reset();
    this.formSubmitted = false;
  }

}
