import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent} from './header/header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactItemComponent } from './contacts/contact-item/contact-item.component';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { DocumentItemComponent } from './documents/document-item/document-item.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageItemComponent } from './messages/message-item/message-item.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import {DropdownDirective} from "./shared/dropdown.directive";
import {ContactService} from "./contacts/contact.service";
import {MessagesServices} from "./messages/messages.service";
import {DocumentsService} from "./documents/documents.service";
import {AppRoutingModule} from "./app-routing.module";
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import {WindRefService} from "./wind-ref.service";
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import {FormsModule} from "@angular/forms";
import {DndModule} from "ng2-dnd";
import { ContactsFilterPipe } from './contacts/contacts-filter.pipe';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    ContactDetailsComponent,
    ContactListComponent,
    ContactItemComponent,
    DocumentsComponent,
    DocumentListComponent,
    DocumentDetailComponent,
    DocumentItemComponent,
    MessagesComponent,
    MessageItemComponent,
    MessageEditComponent,
    MessageListComponent,
    DropdownDirective,
    DocumentEditComponent,
    ContactEditComponent,
    ContactsFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DndModule.forRoot()
  ],
  providers: [ContactService,
              DocumentsService,
              MessagesServices,
              WindRefService],
  bootstrap: [AppComponent]
})
export class AppModule { }
