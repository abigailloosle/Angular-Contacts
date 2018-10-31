import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DocumentsComponent } from "./documents/documents.component";
import { MessagesComponent } from "./messages/messages.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { DocumentEditComponent } from "./documents/document-edit/document-edit.component";
import { DocumentDetailComponent } from "./documents/document-detail/document-detail.component";
import {ContactDetailsComponent} from "./contacts/contact-details/contact-details.component";
import {ContactEditComponent} from "./contacts/contact-edit/contact-edit.component";


const appRoutes: Routes = [
  { path: '', redirectTo: '/documents', pathMatch: 'full' },
  { path: 'documents', component: DocumentsComponent, children: [
      { path: 'new', component: DocumentEditComponent },
      { path: ':id', component: DocumentDetailComponent },
      { path: ':id/edit', component: DocumentEditComponent }
    ]},
  { path: 'messages', component: MessagesComponent },
  { path: 'contacts', component: ContactsComponent, children: [
    { path: 'new', component: ContactEditComponent },
    { path: ':id', component: ContactDetailsComponent },
    { path: ':id/edit', component: ContactEditComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
