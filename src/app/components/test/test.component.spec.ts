import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestComponent } from './test.component';
import { HighlightDirective } from 'src/app/directives/highlight.directive';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReversePipe } from 'src/app/pipes/reverse.pipe';

describe('TestComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let des: DebugElement[];
  let bareH2: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, HighlightDirective, ReversePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    // all elements with an attached HighlightDirective
    des = fixture.debugElement.queryAll(By.directive(HighlightDirective));
    // the h2 without the HighlightDirective
    bareH2 = fixture.debugElement.query(By.css('h2:not([highlight])'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // color tests
  it('should have three highlighted elements', () => {
    expect(des.length).toBe(3);
  });

  it('should color 1st <h2> background "yellow"', () => {
    const bgColor = des[0].nativeElement.style.backgroundColor;
    expect(bgColor).toBe('yellow');
  });

  it('should color 2nd <h2> background w/ default color', () => {
    const dir = des[1].injector.get(HighlightDirective) as HighlightDirective;
    const bgColor = des[1].nativeElement.style.backgroundColor;
    expect(bgColor).toBe(dir.defaultColor);
  });

  it('should bind <input> background to value color', () => {
    // easier to work with nativeElement
    const input = des[2].nativeElement as HTMLInputElement;
    expect(input.style.backgroundColor)
      .withContext('initial backgroundColor')
      .toBe('cyan');
    input.value = 'white';
    // Dispatch a DOM event so that Angular responds to the input value change.
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(input.style.backgroundColor)
      .withContext('changed backgroundColor')
      .toBe('white');
  });

  it('bare <h2> should not have a customProperty', () => {
    expect(bareH2.properties['customProperty']).toBeUndefined();
  });

  it('should render reversed text', () => {
    const pElement = fixture.nativeElement.querySelector('p');
    console.log(pElement.textContent);

    expect(pElement.textContent).toBe('olleh');
  });
});
