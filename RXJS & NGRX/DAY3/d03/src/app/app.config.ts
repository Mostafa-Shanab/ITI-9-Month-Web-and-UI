import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { counterReducer } from './store/reducres';
import { provideEffects } from '@ngrx/effects';
import { CounterEffect } from './store/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      counter: counterReducer,
      // counter2: counterReducer2,
      // auth: authReducer,
    }),
    provideEffects([CounterEffect]),
  ],
};
