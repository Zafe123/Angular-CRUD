import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OnInit, Inject } from '@angular/core';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})

export class EmpAddEditComponent implements OnInit {

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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
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

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }
  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {

            this._coreService.openSnackBar('Employee updated successfully')
            this._dialogRef.close(true);

          },
          error: (err: any) => {
            console.error(err)
          },
        });
      } else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {

            this._coreService.openSnackBar('Employee added successfully', 'done')
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


}