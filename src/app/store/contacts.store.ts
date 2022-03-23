import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Observable } from "rxjs";
import { Contact } from "../models/contact";

export interface ContanctsState{
    contacts: Contact[];
    search: string;
}

@Injectable()
export class ContactsStore extends ComponentStore<ContanctsState>{
    constructor(){
        super({
            contacts: [
                {
                    contactName: 'John Doe',
                    contactNumber: 111-555-1234
                },
                {
                    contactName: 'Jane Doe',
                    contactNumber: 111-555-5678
                },
                {
                    contactName: 'John Doe John',
                    contactNumber: 111-555-9012
                },
                {
                    contactName: 'Jane Doe John',
                    contactNumber: 111-555-3456
                },
                {
                    contactName: 'John Doe Jane',
                    contactNumber: 111-555-7890
                },
                {
                    contactName: 'Jane Doe Jane',
                    contactNumber: 111-555-1234
                },
                
            ],
            search: ''
        })
    }

    contacts: Observable<Contact[]> = this.select(state => state.contacts);

    filteredContancts = this.select(({contacts, search}) => contacts.filter((c) => {
        c.contactName.toLowerCase().includes(search.toLowerCase())
    }))
}