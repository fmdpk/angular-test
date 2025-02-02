import { Component } from '@angular/core';

@Component({
  selector: 'app-my-button',
  template: `<button (click)="btnClick()">{{ text }}</button>`,
})
export class MyButtonComponent {
  text: string = 'Click Me';

  btnClick() {
    this.text = 'Clicked';
  }
}
