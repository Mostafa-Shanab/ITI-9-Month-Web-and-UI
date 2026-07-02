import { createAction, props } from '@ngrx/store';

export const addContact = createAction(
  '[Contact] Add Contact',
  props<{ name: string; email: string; phone: string }>()
);
