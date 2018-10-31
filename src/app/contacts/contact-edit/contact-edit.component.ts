import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Contact} from "../contact.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ContactService} from "../contact.service";
import {Document} from "../../documents/document.model";

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  id: string;
  contact: Contact = null;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  hasGroup: boolean = false;
  originalContact: Contact;
  invalidGroupContact = true;

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.originalContact = this.contactService.getContact(this.id);

        if (!this.id) {
          this.editMode = false;
          return
        } else if (!this.originalContact) {
          return;
        } else {
          this.editMode = true;
          this.contact = JSON.parse(JSON.stringify(this.originalContact));
        }

        if (this.contact.group) {
          this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
        }
      }
    )
  }


  onSubmit(form: NgForm) {
    const values = form.value;
    const id = this.contactService.getMaxId();

    const newContact = new Contact("", values.name, values.email, values.phone, values.img, this.groupContacts);

    if(this.editMode === true) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }

    this.router.navigate(['contacts']);
  }

  onCancel() {
    this.router.navigate(['contacts']);
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      return false;
    }

    if (newContact.id === this.contact.id) {
      return true;
    }

    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any) {
    let selectedContact: Contact = $event.dragData;
    console.log(JSON.stringify($event));
    console.log(JSON.stringify($event.dragData));
    this.invalidGroupContact = this.isInvalidContact(selectedContact);

    if (this.invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact);
    this.invalidGroupContact = false;
  }

  onRemoveItem(idx: number) {
    if (idx < 0 || idx >= this.groupContacts.length) {
      return;
    }

    this.groupContacts.splice(idx, 1);
    this.invalidGroupContact = false;
  }
}
