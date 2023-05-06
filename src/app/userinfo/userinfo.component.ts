import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit {

  userFullName: string = '';


  constructor(private http: HttpClient) {
    const userId = localStorage.getItem('userId');
    const usersUrl = 'http://localhost:3000/signupUsers';

    this.http.get<any[]>(usersUrl).subscribe(users => {
      const currentUser = users.find(user => user.id === Number(userId));
      if (currentUser) {
        this.userFullName = currentUser.fullname;
      }
    });
  }

  ngOnInit(): void {


  }




  successNotification() {
    Swal.fire('Hi', 'Signup Successful', 'success');
  }

}
