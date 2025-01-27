import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuoteComponent } from './quote.component';
import { By } from '@angular/platform-browser';

describe('QuoteComponent', () => {
  let component: QuoteComponent;
  let fixture: ComponentFixture<QuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuoteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should add a quote when the "Add Quote" button is clicked', () => {
    const addButton = fixture.nativeElement.querySelector('button');
    addButton.click();
    fixture.detectChanges();

    expect(component.quotes.length).toBe(1);
    expect(component.quotes[0]).toBe('Quote 1');

    const quoteCards = fixture.nativeElement.querySelectorAll('.quote-card');
    const quoteCard = fixture.debugElement.query(By.css('.quote-card'))
    quoteCards[0].click()
    fixture.detectChanges();

    expect(quoteCards.length).toBe(1);
    expect(component.quotes.length).toBe(0);
    expect(quoteCards[0].textContent).toContain('Quote 1');
  });

  it('should remove a quote when a quote card is clicked', () => {
    component.quotes = ['Quote 1', 'Quote 2', 'Quote 3'];
    fixture.detectChanges();

    const quoteCards = fixture.nativeElement.querySelectorAll('.quote-card');
    quoteCards[1].click();
    fixture.detectChanges();

    expect(component.quotes.length).toBe(2);
    expect(component.quotes).not.toContain('Quote 2');

    const updatedQuoteCards = fixture.nativeElement.querySelectorAll('.quote-card');
    expect(updatedQuoteCards.length).toBe(2);
    expect(updatedQuoteCards[0].textContent).toContain('Quote 1');
    expect(updatedQuoteCards[1].textContent).toContain('Quote 3');
  });

  it('should not remove any quote if the list is empty', () => {
    component.quotes = [];
    fixture.detectChanges();

    component.removeQuote(0);
    fixture.detectChanges();

    expect(component.quotes.length).toBe(0);
  });

  it('should add multiple quotes in the correct order', () => {
    const addButton = fixture.nativeElement.querySelector('button');

    addButton.click();
    addButton.click();
    addButton.click();
    fixture.detectChanges();

    expect(component.quotes).toEqual(['Quote 1', 'Quote 2', 'Quote 3']);
  });
});