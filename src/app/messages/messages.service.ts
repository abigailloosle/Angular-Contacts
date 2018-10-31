import {EventEmitter, Injectable} from "@angular/core";
import { Message } from "./message.model";
import { MOCKMESSAGES } from "./MOCKMESSAGES";
import {Contact} from "../contacts/contact.model";

import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Subject} from "rxjs/internal/Subject";
import {ContactService} from "../contacts/contact.service";

@Injectable()
export class MessagesServices {
  messageSelected = new EventEmitter<Message>();
  messageChangedEvent = new EventEmitter<Message[]>();
  messageListChangedEvent = new Subject<Message[]>();
  maxMessageId: number;

  messages: Message[] = [];

  constructor (private http: HttpClient) {
    this.getMessages();
  }

  getMessages(): Message[]{
    if (this.messages.length > 0) {
      return this.messages.slice();
    }

    this.http.get("https://cit366-f1b2b.firebaseio.com/messages.json").subscribe(
      (messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        // this.messages.sort(
        //   (a, b) => {
        //     const docA = a.subject.toUpperCase();
        //     const docB = b.subject.toUpperCase();
        //     if (docA < docB) {
        //       return -1;
        //     } else if (docA > docB) {
        //       return 1;
        //     } else {
        //       return 0;
        //     }
        //   });

        this.messageChangedEvent.next(this.messages.slice());
        return this.messages.slice();
      },

      (error: any) => {
        console.log(error);
      }
    );
  }

  storeMessage() {
    const messages = JSON.stringify(this.messages)
    const header = new HttpHeaders({
      'Content-type': 'application/json'
    })

    this.http.put("https://cit366-f1b2b.firebaseio.com/messages.json"
      , messages
      , {headers: header})
      .subscribe(() => this.messageChangedEvent.next(this.messages.slice()));
  }


  getMessage(id: string): Message {
    for (let message of this.messages){
      if (message.id === id){
        return message;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;

    for (let message of this.messages) {
      let messageId = parseInt('message.id');

      if (messageId < maxId) {
        maxId = messageId;
      }
      return maxId;
    }
  }

  addMessage(message: Message){
    this.messages.push(message);
    // this.messageSelected.emit(this.messages.slice());
    this.storeMessage();
  }
}
