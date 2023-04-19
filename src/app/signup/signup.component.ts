import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm!: FormGroup;
  public formSubmitted = false;

  constructor(private _formBuilder: FormBuilder, private http: HttpClient, private router: Router) {

  }

  ngOnInit(): void {
    this.signupForm = this._formBuilder.group({
      fullname: [''],
      email: [''],
      password: [''],
      confirmpassword: ['']
    })
  }
  hide = true;


  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Invalid Email';
    }
    return '';
  }
  signup() {
    this.formSubmitted = true;
    if (this.signupForm.valid) {
      this.http.post<any>("http://localhost:3000/signupUsers", this.signupForm.value)
        .subscribe(res => {
          alert("Signup Successful");
          this.signupForm.reset();
          this.formSubmitted = false;
          this.router.navigate(['login']);
        }, err => {
          alert("Something went Wrong")
        })
    }
  }
}
