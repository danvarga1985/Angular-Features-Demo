import { Component, OnInit, Input, ViewEncapsulation, OnChanges, SimpleChanges, DoCheck, AfterContentInit, AfterContentChecked, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated //None, ShadowDom
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, OnDestroy {
  @Input('srvElement')
  element: {type: string, name: string, content: string};

  constructor() { 
    console.log('constructor called');
  }
  ngOnDestroy(): void {
    console.log('ngOnDestroy called');
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked called')
  }

  ngAfterContentInit(): void {
    console.log('ngAgterContentInit called')
  }

  ngDoCheck(): void {
    console.log('ngDOCheck called')
  }

  ngOnInit() {
    console.log('ngOnIntit called');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called');
    console.log(changes);
  }

}
