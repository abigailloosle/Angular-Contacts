import { Component, OnInit, Input } from '@angular/core';

import { Message } from "../message.model";
import { Contact } from "../../contacts/contact.model";
import { ContactService } from '../../contacts/contact.service';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string = "";
  canEdit: boolean = false;

  constructor(private contactsService: ContactService) { }

  ngOnInit() {
    let contact: Contact = this.contactsService.getContact(this.message.sender);
    this.messageSender = contact.name;
  }

}
