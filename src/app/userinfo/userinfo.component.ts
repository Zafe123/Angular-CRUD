import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit {
  hide: any;
  email: any;
  confirmpassword: any;
  signupForm: any;

  constructor() {
  }

  ngOnInit(): void {

  }




  successNotification() {
    Swal.fire('Hi', 'Signup Successful', 'success');
  }

}
