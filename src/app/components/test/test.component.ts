import { Component } from '@angular/core';

@Component({
  template: ` <h2 highlight="yellow">Something Yellow</h2>
    <h2 highlight>The Default (Gray)</h2>
    <h2>No Highlight</h2>
    <p>{{ 'hello' | reverse }}</p>
    <input #box [highlight]="box.value" value="cyan" />`,
})
export class TestComponent {}
