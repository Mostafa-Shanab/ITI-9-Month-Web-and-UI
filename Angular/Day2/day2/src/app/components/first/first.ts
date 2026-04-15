import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-first',
  templateUrl: './first.html',
  styleUrl: './frist.css',
  imports: [FormsModule],
})
export class First {
  name: string = 'fname';
  value: string = 'ali';
  colspan: number = 2;
  err: boolean = true;
  success = true;
  classes: string[] = ['danger', 'sucess'];
  data: string = '';
  twoWay: string = '';
  number: number = 1;
  images: string[] = ['1-2.PNG', '1-4.PNG'];

  //   changeData(t: Event) {
  //     // console.log(t.target.value);
  //     let tt = t.target as HTMLInputElement;
  //     this.data = tt.value;
  //   }
  changeData(t: Event) {
    // console.log(t.target.value);
    let tt = t.target as HTMLInputElement;
    this.number = +tt.value;
  }
  dis() {
    return 'jjjjj';
  }
}

// Binding
//  one way binding =>
//           interpolation    {{}}
//           attr - property binding
//           class - style binding
// TS => html
// event binding
// html => TS
// two way binding
// Ts <=> html
