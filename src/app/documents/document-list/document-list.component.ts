import { Component, OnInit, OnDestroy } from '@angular/core';

import { Document } from "../document.model";
import { DocumentsService } from "../documents.service";
import { Subscription } from "rxjs/internal/Subscription";

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[] = [];
  private subscription: Subscription;

  constructor(private documentService: DocumentsService) { }

  ngOnInit() {
   this.documents = this.documentService.getDocuments();
   // this.documentService.documentChangedEvent
   this.subscription = this.documentService.documentListChangedEvent
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
