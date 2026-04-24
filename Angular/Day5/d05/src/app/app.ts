import { Component } from '@angular/core';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { Custom } from './directives/custom';
import { Header } from './components/header/header';
import { Home } from './components/home/home';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
