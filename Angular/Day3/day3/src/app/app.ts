import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Form } from './components/form/form';
import { Product } from './types';
import { Productlists } from "./components/productlists/productlists";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [CommonModule, Form, Productlists],
})
export class App {
  // show = true;

  // hideShow(data: any) {
  // console.log(data[1].value);
  // console.log(data[2].value);
  // console.log(data[3].value);
  //   this.show = !this.show;
  // }

  // stdArr = [
  //   {
  //     id: 1567567,
  //     fname: 'ali',
  //     lname: 'hossam',
  //   },
  //   {
  //     id: 246456456,
  //     fname: 'ahmed',
  //     lname: 'hassan',
  //   },
  //   {
  //     id: 34568787,
  //     fname: 'khaled',
  //     lname: 'essam',
  //   },
  // ];

  // refreshStdArr() {
  //   this.stdArr = [
  //     {
  //       id: 1567567,
  //       fname: 'ali',
  //       lname: 'hossam',
  //     },
  //     {
  //       id: 246456456,
  //       fname: 'ahmed',
  //       lname: 'hassan',
  //     },
  //     {
  //       id: 34568787,
  //       fname: 'khaled',
  //       lname: 'essam',
  //     },
  //   ];
  // }

  // shiftArr() {
  //   const d = this.stdArr.shift();
  //   console.log(d);
  // }

  // unShiftArr() {
  //   const d = this.stdArr.unshift({
  //     id: 455,
  //     fname: 'eeee',
  //     lname: 'yyyy',
  //   });
  //   console.log(d);
  // }

  // trackByFun(index: number, std: any) {
  //   console.log(index);
  //   console.log(std);
  //   // return index;
  //   return std.id;
  // }

  AppParentNumber = 0;

  prodArr: Product[] = [];

  inc() {
    this.AppParentNumber++;
  }

  getData(prod: Product) {
    this.prodArr.push(prod);
    console.log(this.prodArr);
  }
}

// directives => class can add behvior or modify Dom element in template (add as an attribute)
// (1) component directive => compoenent in angular is a compenent directive => class decorated with @component decorator
//  selector , template , logic , can interact with dom and other components
// (2) Attribute directive =>
//                           - ngModel => two binding
//                           - ngClass
//                           - ngStyle
//                           - [class] vs NgClass
// (3) structrual directive =>
//                           - ngIf
//                           - ngFor
//                           - ngSwitch => (selfStudy)
// (4) custom directive

// <ng-template> => container for html code => will not be rendered => will be rendered based on instructions
//  instructions => cond.
//  template refernce variable => we can add it on html => #varName

//  arr.toString()=>   "kkk,klkkk,kkkk"
//  obj.toString()=>   [object Object]
