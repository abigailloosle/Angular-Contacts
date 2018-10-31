import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from "../message.model";
import {MessagesServices} from "../messages.service";
import {ContactService} from "../../contacts/contact.service";

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('msgTextInput') msgTextInput: ElementRef;
  @ViewChild('subjectRef') subjectRef: ElementRef;


  constructor(private messageService: MessagesServices,
              private contactService: ContactService) { }

  ngOnInit() {
  }

  onSendMessage() {
    const mesSubject = this.subjectRef.nativeElement.value;
    const mesContent = this.msgTextInput.nativeElement.value;
    const currentSender = '10';

    const makeMessage = new Message('3', mesSubject, mesContent, currentSender);

    this.messageService.addMessage(makeMessage);
  }

  onClear() {
    this.msgTextInput.nativeElement.value = '';
    this.subjectRef.nativeElement.value = '';

  }

}
