import {Directive, HostBinding, HostListener} from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpen(){
    this.isOpen = !this.isOpen;
  }

  @HostListener('mouseleave') toggleClose(){
    this.isOpen = false;
  }
}
