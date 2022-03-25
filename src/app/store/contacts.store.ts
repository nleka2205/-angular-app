import { Injectable } from "@angular/core";
import { DialogService } from "@ngneat/dialog";
import { HotToastService } from "@ngneat/hot-toast";
import { ComponentStore } from "@ngrx/component-store";
import { Observable, EMPTY } from "rxjs";
import { catchError, concatMap, filter, switchMap, tap } from "rxjs/operators";
import { AddcontactComponent } from "../components/addcontact/addcontact.component";
import { Contact } from "../models/contact";
import { ContactsService } from "../services/contacts.service";

export interface ContanctsState{
    contacts: Contact[];
    search: string;
}

@Injectable({
    providedIn: 'root'
})

export class ContactsStore extends ComponentStore<ContanctsState>{
    constructor(
        private contactsService: ContactsService,
        private toast: HotToastService,
        private dialog: DialogService
    ){
        super({
            contacts: [],
            search: '',
        });
    
        this.fetchContacts();
    }

    //contacts: Observable<Contact[]> = this.select(state => state.contacts);

    readonly filteredContacts: Observable<Contact[]> = this.select(
        ({contacts, search}) => 
            contacts.filter((c) => 
                c.contactName.toLowerCase().includes(search.toLowerCase())
            )
    );

        
    readonly setContacts = this.updater((state, contacts: Contact[]) => ({
        ...state,
        contacts,
    }));
    
    readonly fetchContacts = this.effect((trigger) =>
        trigger.pipe(
            switchMap(() =>
                this.contactsService.fetchContacts().pipe(
                    this.toast.observe({
                        loading: 'Loading...',
                        success: 'Contacts fetched!',
                        error: 'Could not fetch.',
                    }),
                    tap(data => {
                        this.setContacts(data);
                    }),
                    catchError(() => EMPTY)
                )
            )
        )
    );
    readonly deleteContact = this.effect<Contact>((contact) =>
        contact.pipe(
            concatMap((contact) =>
                this.contactsService.deleteContact(contact).pipe(
                this.toast.observe({
                    loading: 'Deleting contact...',
                    success: 'Contact deleted!',
                    error: 'Could not delete.',
                }),
                tap(() => this.fetchContacts()),
                catchError(() => EMPTY)
                )
            )
        )
    );
    readonly addContact = this.effect<Contact>((contact) =>
        contact.pipe(
        concatMap(contact =>
            this.contactsService.addContact(contact).pipe(
                tap(() => this.fetchContacts()),
                this.toast.observe({
                    loading: 'Adding contact...',
                    success: 'Contact added!',
                    error: 'Could not add.',
                }),
                catchError(() => EMPTY)
                )
            )
        )
    );

    readonly showAddDialog = this.effect((trigger$) =>
        trigger$.pipe(
            switchMap(() => 
                this.dialog.open(AddcontactComponent).afterClosed$.pipe(
                    filter(contact => !!contact),
                    tap((contact: Contact) => {
                        this.addContact(contact);
                    })
                )
            )           
        )
    );
}