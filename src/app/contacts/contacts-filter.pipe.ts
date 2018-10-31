import { Pipe, PipeTransform } from '@angular/core';
import {Contact} from "./contact.model";

@Pipe({
  name: 'contactsFilter',
  pure: false
})
export class ContactsFilterPipe implements PipeTransform {

  // transform(contacts: any, [term]): any {
    transform(contacts: Contact[], [term]): any {

      let filteredArray: Contact[] = [];

    // for (let i=0; i<contacts.length; i++) {
    //   let contact = contacts[i];
    //   if (contact.name.toLowerCase().includes(term)) {
    //     filteredArray.push(contact);
    //   }
    // }

      filteredArray = contacts.filter(
        (contact: any) => contact.name.toLowerCase().includes(term.toLowerCase())
      );

    if (filteredArray.length < 1) {
      return contacts;
    }

    return filteredArray;
  }

}
