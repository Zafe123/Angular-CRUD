import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OnInit, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})

export class EmpAddEditComponent implements OnInit {

  gender = new FormControl('', Validators.required);

  education: string[] = [
    'High-school',
    'Vocational',
    'College Graduate',
    'Masterals',
    'Docotorate',
  ]

  empForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: ['', Validators.required],
      education: '',
      company: '',
      experience: '',
      salary: '',

    })
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  successNotification() {
    Swal.fire('Success', 'Employee Added Successfully', 'success');
  }
  updateNotification() {
    Swal.fire('Success', 'Employee Updated Successfully', 'success');
  }


  formSubmitted = false;

  onFormSubmit() {
    this.formSubmitted = true;
    if (this.empForm.valid) {
      if (this.data) {
        this._empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            this.updateNotification();
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err)
          },
        });
      } else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this.successNotification();
            this._dialogRef.close(true);
          },
          error: (err) => {
            console.error(err)
          },
        });
      }
    }
  }

  closeForm() {
    this._dialogRef.close();
  }

  clearForm() {
    this.formSubmitted = false;
    this.empForm.reset();
  }


}