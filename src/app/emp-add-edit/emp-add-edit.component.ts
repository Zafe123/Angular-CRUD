import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private _fb: FormBuilder) {
    this.empForm = this._fb.group({
      firstName: '',
      lasttName: '',
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
      console.log(this.empForm.value);
    }
  }


}
