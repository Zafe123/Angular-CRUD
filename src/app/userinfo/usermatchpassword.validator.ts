import { ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';



export const matchpassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    let newpassword = control.get('newpassword');
    let confirmPassword = control.get('confirmpassword');

    if (newpassword && confirmPassword && newpassword.value !== confirmPassword.value) {
        return { passwordmatcherror: true };
    }

    return null;
}