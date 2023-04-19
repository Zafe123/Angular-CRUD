import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { matchpassword } from './matchpassword.validator';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm!: FormGroup;
  public formSubmitted = false;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl(null, [Validators.required]);
  confirmpassword = new FormControl(null, [Validators.required]);


  constructor(private _formBuilder: FormBuilder, private http: HttpClient, private router: Router) {


  }

  ngOnInit(): void {
    this.signupForm = this._formBuilder.group({
      fullname: [''],
      email: [''],
      password: [''],
      confirmpassword: ['']
    }, {
      validators: matchpassword
    })

  }
  hide = true;




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


  signup() {
    this.formSubmitted = true;
    if (this.signupForm.valid) {
      this.http.post<any>("http://localhost:3000/signupUsers", this.signupForm.value)
        .pipe(
          tap(res => {
            alert("Signup Successful");
            this.signupForm.reset();
            this.formSubmitted = false;
            this.router.navigate(['login']);
          })
        )
        .subscribe({
          error: err => {
            alert("Something went Wrong")
          }
        });
    }
  }


}
