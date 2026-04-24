import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

function noSpace(control: AbstractControl): ValidationErrors | null {
  return control.value.includes(' ') ? { nospace: true } : null;
}
function matchPasswords(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmpassword = control.get('confirmpassword')?.value;
  return password === confirmpassword ? null : { missMatch: true };
}

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styles: ``,
})
export class Signup {
  form = new FormGroup(
    {
      username: new FormControl('ali', [Validators.required, noSpace]),
      email: new FormControl('ali@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl('ali', [Validators.required, Validators.minLength(8)]),
      confirmpassword: new FormControl('ali', [Validators.required, Validators.minLength(8)]),
    },
    {
      validators: matchPasswords,
    },
  );
  handleSubmit() {
    console.log(this.form);
  }
}
