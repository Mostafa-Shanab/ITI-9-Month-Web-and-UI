import { createFeatureSelector } from '@ngrx/store';
import { Contact } from './reducres';

export const selectContacts = createFeatureSelector<Contact[]>('contacts');
