import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Document} from "../document.model";
import {DocumentsService} from "../documents.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  id: string;
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;


  constructor(private documentService: DocumentsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];

        if (!this.id) {
          this.editMode = false;
          return
        }

        this.originalDocument = this.documentService.getDocument(this.id);

        if (!this.originalDocument) {
          return;
        }

        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      }
    )
  }

  onSubmit(form: NgForm) {
    const values = form.value;
    const id = this.documentService.getMaxId();

    const newDocument = new Document("", values.name, values.description, values.url, null);

    if(this.editMode === true) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }

    this.router.navigate(['/documents']);
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }

}
