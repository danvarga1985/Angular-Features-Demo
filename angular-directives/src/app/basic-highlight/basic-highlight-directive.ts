import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  // [] makes it recognized whenever it is added to an element
  selector: '[appHighlight]'
})

export class BasicHighlightDirective implements OnInit{
  // Private makes it a property of this class, and assigns its value to the property
  constructor(private elementRef: ElementRef) {
  }

  // Runs on initialization
  ngOnInit(): void {
    this.elementRef.nativeElement.style.backgroundColor = 'green';
  }
}
