import { Component } from '@angular/core';

@Component({
  selector: 'app-material-button',
  template: `
    <button mat-button (click)="onClick()">Click Me</button>
    <p *ngIf="clicked">Button was clicked!</p>
  `,
})
export class MaterialButtonComponent {
  clicked = false;

  onClick() {
    this.clicked = true;
  }
}
