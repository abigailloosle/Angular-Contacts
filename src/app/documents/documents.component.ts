import { Component, OnInit } from '@angular/core';
import {DocumentsService} from "./documents.service";
import {Contact} from "../contacts/contact.model";

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  selectedDocument: Document;

  constructor(private documentService: DocumentsService) { }

  ngOnInit() {
    this.documentService.documentSelected.subscribe(
      (document: Document) => {
        this.selectedDocument = document;
      }
    )
  }

}
