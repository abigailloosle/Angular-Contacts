import {Component, OnInit} from '@angular/core';
import {Message} from "../message.model";
import {MessagesServices} from "../messages.service";


@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];

  constructor(private messageService: MessagesServices) {
  }

  ngOnInit() {
    this.messages = this.messageService.getMessages();

    this.messageService.messageChangedEvent.subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    )
  }


}
