import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appRandomColor]'
})
export class RandomColorDirective implements OnInit {

  colors: string[] = ['#378DE7', '#6149CB', '#40B681', '#DE934E', '#9C3939'];
  randomItem: string = "";

  constructor(private element: ElementRef) { }

  ngOnInit() {
    this.element.nativeElement.style.backgroundColor = this.getRandomColor();
  }

  getRandomColor() {
    this.randomItem = this.colors[Math.floor(Math.random() * this.colors.length)];
    console.log('s', this.randomItem);
    return this.randomItem;
  }
}
