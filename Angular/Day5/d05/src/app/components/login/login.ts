import { Component } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styles: ``,
})
export class Login {
  // handleSubmit(f: HTMLFormElement, e: Event) {
  //   e.preventDefault();
  //   console.log(f);
  // }
  emali = '';

  handleSubmit(f: NgForm, e: NgModel, p: NgModel) {
    console.log(f);
    console.log(e.control.errors?.['required']);
    console.log(p);
    console.log(f.value);
    localStorage.setItem('email', f.value.email);
    f.reset();
  }
}
