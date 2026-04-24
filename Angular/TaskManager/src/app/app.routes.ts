import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup').then((m) => m.SignupComponent),
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then((m) => m.HomeComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'add-task',
    loadComponent: () => import('./pages/add-task/add-task').then((m) => m.AddTaskComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'lists',
    loadComponent: () => import('./pages/lists/lists').then((m) => m.ListsComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.AboutComponent),
    canActivate: [AuthGuard],
  },
];
