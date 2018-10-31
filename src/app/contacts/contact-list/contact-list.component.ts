import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactsFilterPipe } from '../contacts-filter.pipe';

import { Contact } from "../contact.model";
import { ContactService } from "../contact.service";
import {Subscription} from "rxjs/internal/Subscription";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  subscription: Subscription;
  term = '';

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();

    // this.contactService.contactChangedEvent
    this.subscription = this.contactService.contactListChangedEvent
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onKeyPress(value: string) {
    this.term = value;
  }


}
