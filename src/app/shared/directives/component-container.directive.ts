import { Directive, ViewContainerRef  } from '@angular/core';

@Directive({
  selector: '[component-container]'
})
export class ComponentContainerDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}