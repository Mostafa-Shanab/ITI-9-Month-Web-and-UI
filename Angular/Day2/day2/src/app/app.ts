import { Component } from '@angular/core';
import { First } from './components/first/first';
import { Second } from "./components/second/second";
import { Third } from "./components/third/third";
import { End } from "./end/end";
import { Start } from "./start/start";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [First, Second, Third, End, Start],
})
export class App {}
