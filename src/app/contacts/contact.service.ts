import { Injectable, EventEmitter } from "@angular/core";
import { Contact } from "./contact.model";
import { MOCKCONTACTS } from "./MOCKCONTACTS";
import { Subject } from "rxjs/internal/Subject";
import {Document} from "../documents/document.model";
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

@Injectable()
export class ContactService {
  // contactSelected = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;
  contactsListClone: Contact[];

  contacts: Contact[] = [];

  constructor (private http: HttpClient) {
    // this.contacts = MOCKCONTACTS;
    this.getContacts();
  }

  getContacts(): Contact[] {
    // return this.documents.slice();

    if (this.contacts.length > 0) {
      return this.contacts.slice();
    }

    this.http.get("https://cit366-f1b2b.firebaseio.com/contacts.json").subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
        console.log(this.contacts);
        this.maxContactId = this.getMaxId();
        // this.contacts.sort(
        //   (a, b) => {
        //     const docA = a.name.toUpperCase();
        //     const docB = b.name.toUpperCase();
        //     if (docA < docB) {
        //       return -1;
        //     } else if (docA > docB) {
        //       return 1;
        //     } else {
        //       return 0;
        //     }
        //   });

        this.contactListChangedEvent.next(this.contacts.slice())
        return this.contacts.slice();
      },

      (error: any) => {
        console.log(error);
      }
    );

  }

  // getContacts(): Contact[]{
  //   return this.contacts.slice();
  // }

  getContact(contactId: string): Contact {
    for (let contact of this.contacts){
      if (contact.id === contactId){
        return contact;
      }
    }
    return null;
  }

  storeContacts() {
    const contacts = JSON.stringify(this.contacts)
    const header = new HttpHeaders({
      'Content-type': 'application/json'
    })

    return this.http.put("https://cit366-f1b2b.firebaseio.com/contacts.json"
      , contacts
      , {headers: header})
      .subscribe(() => this.contactListChangedEvent.next(this.contacts.slice()));
  }

  // deleteContact(contact: Contact) {
  //   if (contact === null) {
  //     return;
  //   }
  //
  //   const pos = this.contacts.indexOf(contact);
  //   if (pos < 0) {
  //     return;
  //   }
  //
  //   this.contacts.splice(pos, 1);
  //   this.contactChangedEvent.emit(this.contacts.slice());
  // }

  getMaxId(): number {
    let maxId = 0;

    for (let contact of this.contacts) {
      let contactId = parseInt(contact.id);

      if (contactId > maxId) {
        maxId = contactId;
      }
    }
    return maxId;
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return
    }

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    var contactsListClose = this.contacts.slice();
    // this.contactListChangedEvent.next(contactsListClose);
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    var pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    var contactsListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(contactsListClone);
    this.storeContacts();
  }

  deleteContact(contact: Contact) {
    if (contact === null || contact === undefined) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos,1);
    this.contactsListClone = this.contacts.slice();
    this.storeContacts();
  }
}
