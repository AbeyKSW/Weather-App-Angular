import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appRandomColor]'
})
export class RandomColorDirective implements OnInit {

  colors: string[] = ['#378DE7', '#6149CB', '#40B681', '#DE934E', '#9C3939'];
  random_color: string = "";
  previous_colors: string[] = []; // Always have 2 colors

  constructor(private element: ElementRef) { }

  ngOnInit() {
    this.element.nativeElement.style.backgroundColor = this.getRandomColor();
  }

  getRandomColor() {
    this.random_color = "";
    var random_color = this.colors[Math.floor(Math.random() * this.colors.length)];
    // console.log("Picked Color", random_color);

    if (this.previous_colors.includes(random_color)) {
      // console.log("Duplicate Color found");
      this.getRandomColor();
    }
    else {
      // console.log("Picked Color is Original");
      if (this.previous_colors.length > 1) {
        // console.log("Color Array Greater than 1");
        this.previous_colors.splice(-1, 1);
      }

      this.previous_colors.push(random_color);
      this.random_color = random_color;
      // console.log("Color", this.random_color);
      // console.log("Colors Arr", this.previous_colors);
    }
    return this.random_color;
  }
}
