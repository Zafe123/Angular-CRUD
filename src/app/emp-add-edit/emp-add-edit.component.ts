import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})

export class EmpAddEditComponent {

  education: string[] = [
    'High-school',
    'Vocational',
    'College Graduate',
    'Masterals',
    'Docotorate',
  ]

  empForm: FormGroup;

  constructor(private _fb: FormBuilder, private _empService: EmployeeService, private _dialogRef: MatDialogRef<EmpAddEditComponent>) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      salary: '',

    })
  }
  onFormSubmit() {
    if (this.empForm.valid) {
      this._empService.addEmployee(this.empForm.value).subscribe({
        next: (val: any) => {
          alert('Employee added successfully');
          this._dialogRef.close(true);

        },
        error: (err) => {
          console.error(err)
        }
      })
    }
  }

  closeForm() {
    this._dialogRef.close();
  }


}