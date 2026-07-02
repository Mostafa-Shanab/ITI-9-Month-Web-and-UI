import { createReducer, on } from '@ngrx/store';
import { addContact } from './actions';

export interface Contact {
  name: string;
  email: string;
  phone: string;
}

export const initialState: Contact[] = [];

export const contactsReducer = createReducer(
  initialState,
  on(addContact, (state, { name, email, phone }) => [
    ...state,
    { name, email, phone }
  ])
);
