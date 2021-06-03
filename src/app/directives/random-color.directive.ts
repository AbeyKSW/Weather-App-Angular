import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appRandomColor]'
})
export class RandomColorDirective implements OnInit {

  colors: string[] = ['#378DE7', '#6149CB', '#40B681', '#DE934E', '#9C3939'];
  randomItem: string = "";
  previousColors: string[] = []; // Always have 2 colors

  constructor(private element: ElementRef) { }

  ngOnInit() {
    this.element.nativeElement.style.backgroundColor = this.getRandomColor();
  }

  getRandomColor() {
    this.randomItem = "";
    var randomItem = this.colors[Math.floor(Math.random() * this.colors.length)];
    console.log("Picked Color", randomItem);

    if (this.previousColors.includes(randomItem)) {
      console.log("Duplicate Color found");
      this.getRandomColor();
    }
    else {
      console.log("Picked Color is Original");
      if (this.previousColors.length > 1) {
        console.log("Color Array Greater than 1");
        this.previousColors.splice(-1, 1);
      }

      this.previousColors.push(randomItem);
      this.randomItem = randomItem;
      console.log("Color", this.randomItem);
      console.log("Colors Arr", this.previousColors);
    }
    return this.randomItem;
  }
}
