import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  contacts = [
      {
          contactName: 'John Doe',
          contactNumber: '0692123456'
      },
      {
          contactName: 'Jane Doe',
          contactNumber: '355692123456'
      },
      {
          contactName: 'John Doe Smith',
          contactNumber: '0692123456'
      },
      {
          contactName: 'Jane Doe Smith',
          contactNumber: '355692123456'
      },
      {
          contactName: 'John Jane',
          contactNumber: '0692123456'
      },
      {
          contactName: 'Jane Jane',
          contactNumber: '355692123456'
      }    
  ]

  constructor() {}

  fetchContacts(): Observable<Contact[]> {
    return of(this.contacts).pipe(delay(1000));
  }

  addContact(newContact: Contact): Observable<Contact> {
    this.contacts.unshift(newContact);
    return of(newContact).pipe(delay(1000));
  }

  deleteContact(contact: Contact): Observable<any> {
    const index = this.contacts.findIndex((c) => c.contactName === contact.contactName);
    this.contacts.splice(index, 1);
    return of({ success: true }).pipe(delay(1000));
  }
}
