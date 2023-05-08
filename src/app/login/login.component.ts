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
    const userEmail = this.loginForm.value.email;
    const userPassword = this.loginForm.value.password;

    this.http.get<any>("http://localhost:3000/signupUsers")
      .subscribe({
        next: (res) => {
          const user = res.find((a: any) => {
            return a.email === userEmail;
          });
          if (user && user.password === userPassword) {
            localStorage.setItem('userId', user.id);
            this.loginForm.reset();
            this.router.navigate(['dashboard'])
            const welcomeMsg = `Welcome ${user.fullname}!`;
            this.successNotification(welcomeMsg);
          } else if (user && user.password !== userPassword) {
            this.passwordNotification();
          } else {
            this.userNotification();
          }
        },
        error: (err) => {
          alert('Something Went Wrong')
        }
      });
  }

  successNotification(welcomeMsg: string) {
    Swal.fire('Hi', welcomeMsg, 'success');
  }

  passwordNotification() {
    Swal.fire({
      icon: 'error',
      title: 'Incorrect Password',
      text: 'Please Try again',
    })
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
