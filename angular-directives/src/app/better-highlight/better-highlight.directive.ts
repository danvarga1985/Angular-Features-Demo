import {Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor = 'transparent';

  // By setting an alias, the property has to be referenced in the template in [] (see line 65, as opposed to line 63)
  @Input('appBetterHighlight') highlightColor = 'blue';
  @HostBinding('style.backgroundColor') backgroundColor: string;

  // Assign a dedicated renderer for the element, of which methods can be used to set the style
  // constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.backgroundColor = this.defaultColor;
  }

  // Mouseover event: upon hovering the mouse on the element, the background changes
  @HostListener('mouseenter') mouseover(eventData: Event) {
/*
    // Implementation with Renderer - perfectly fine also
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
*/
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
/*
    // Implementation with Renderer - perfectly fine also
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
*/
    this.backgroundColor = this.defaultColor;
  }

}
