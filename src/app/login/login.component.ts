import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private _formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: [''],
      password: ['']
    })

  }

  login() {
    this.http.get<any>("http://localhost:3000/signupUsers")
      .subscribe({
        next: (res) => {
          const user = res.find((a: any) => {
            return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
          });
          if (user) {
            this.successNotification();
            this.loginForm.reset();
            this.router.navigate(['dashboard'])
          } else {
            this.userNotification();
          }
        },
        error: (err) => {
          alert('Something Went Wrong')
        }
      });
  }

  successNotification() {
    Swal.fire('Hi', 'Login Success', 'success');
  }

  userNotification() {
    Swal.fire({
      title: '<strong>User not Found</strong>',
      icon: 'info',
      focusConfirm: false,
      confirmButtonText:
        'OK'
    })
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Invalid Email';
    }
    return '';
  }

}
