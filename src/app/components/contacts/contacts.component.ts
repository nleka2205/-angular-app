import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { ContactsStore } from 'src/app/store/contacts.store';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  providers: [ ContactsStore ]
})
export class ContactsComponent implements OnInit {

  contacts = this.store.filteredContacts;

  constructor(
    private store: ContactsStore
  ) { }



  ngOnInit(): void {
  }

  addContact() {
    this.store.showAddDialog();
  }

  searchContacts(search: string): void {
    this.store.patchState({ search });
  }

  deleteContact(contact: Contact) {
    this.store.deleteContact(contact);
  }
}
