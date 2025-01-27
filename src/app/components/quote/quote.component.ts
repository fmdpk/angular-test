// quote.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-quote',
  template: `
    <button (click)="addQuote()">Add Quote</button>
    <div *ngFor="let quote of quotes; let i = index" (click)="removeQuote(i)" class="quote-card">
      {{ quote }}
    </div>
  `,
})
export class QuoteComponent {
  quotes: string[] = [];

  addQuote() {
    this.quotes.push(`Quote ${this.quotes.length + 1}`);
  }

  removeQuote(index: number) {
    this.quotes.splice(index, 1);
  }
}