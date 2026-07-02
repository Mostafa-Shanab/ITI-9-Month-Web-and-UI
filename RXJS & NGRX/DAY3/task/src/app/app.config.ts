import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { contactsReducer } from './store/reducres';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideStore({
      contacts: contactsReducer,
    }),
  ]
};
