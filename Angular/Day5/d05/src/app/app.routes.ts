import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { Users } from './components/users/users';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { Tracks } from './components/tracks/tracks';
import { Layout } from './components/layout/layout';
import { Notfound } from './components/notfound/notfound';
import { Web } from './components/web/web';
import { Mobile } from './components/mobile/mobile';
import { Profile } from './components/profile/profile';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
        // /gg
      },
      {
        path: 'home',
        component: Home,
      },
      {
        path: 'about',
        component: About,
      },
      {
        path: 'users',
        component: Users,
      },
      {
        path: 'users/:id', // route param
        component: Profile,
      },
      {
        path: 'tracks',
        component: Tracks,
        children: [
          {
            path: '',
            component: Web,
          },
          {
            path: 'web',
            component: Web,
          },
          {
            path: 'mobile',
            component: Mobile,
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'signup',
    component: Signup,
  },

  {
    path: '**',
    component: Notfound,
  },
];

// web app => layouts

// canActive => How to protect routes
// lazyloading
