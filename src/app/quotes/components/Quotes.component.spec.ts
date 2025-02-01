/* tslint:disable:no-unused-variable */
import { async, waitForAsync, fakeAsync, ComponentFixture, TestBed, tick, flush } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { QuotesComponent } from "./Quotes.component";
import { QuoteService } from "../service/Quote.service";
import { QuoteModel } from "../model/QuoteModel";
import { FormsModule } from "@angular/forms";
import { delay, interval, of, take } from "rxjs";
import { click } from "src/app/helpers/test-helpers/click";

describe("QuotesComponent", () => {
  let component: QuotesComponent;
  let fixture: ComponentFixture<QuotesComponent>;
  let service: QuoteService;

  beforeEach(async () => {
    service = new QuoteService();
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [QuotesComponent],
      providers: [QuoteService]
    }).compileComponents();
    service = TestBed.inject(QuoteService)
    fixture = TestBed.createComponent(QuotesComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it("should create Quote component", () => {
    expect(component).toBeTruthy();
  });

  it("should use the quoteList from the service", () => {
    const quoteService = fixture.debugElement.injector.get(QuoteService);
    fixture.detectChanges();
    expect(quoteService.getQuote()).toEqual(component.quoteList);
  });

  it("should create a new post", () => {
    component.quoteText = "I love this test";
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.innerHTML).toContain("I love this test");
  });

  it('should add a quote when the "Add Quote" button is clicked', () => {
    // Get the button element
    component.quoteText = "I love this test";
    let button = fixture.debugElement.query(By.css('.btn-primary'))
    click(button)
    // button.triggerEventHandler('click', null)

    // Verify that a quote is added
    const quoteService = fixture.debugElement.injector.get(QuoteService)
    expect(quoteService.quoteList.length).toBe(1);

    // Verify that the quote is displayed in the template
    const quoteCards = fixture.nativeElement.querySelectorAll('.card');
    expect(quoteCards.length).toBe(1);
  });

  it('should remove a quote when a quote card is clicked', () => {
    // Add a quote first
    component.quoteList = [new QuoteModel('Quote 1', "Mon 4, 2018")];
    fixture.detectChanges();

    // Get the quote cards
    fixture.debugElement
      .query(By.css(".card-parent")).children[0]
      .triggerEventHandler("click", null)

    // Simulate a click on the second quote card (index 0)
    fixture.detectChanges();

    // Verify that the quote is removed
    expect(component.quoteList.length).toBe(0);
  });

  it('should not remove any quote if the list is empty', () => {
    // Ensure the list is empty
    component.quoteList = [];
    fixture.detectChanges();

    // Try to remove a quote (should do nothing)
    component.removeQuote(0);
    fixture.detectChanges();

    // Verify that the list remains empty
    expect(component.quoteList.length).toBe(0);
  });

  it('should add multiple quotes in the correct order', async () => {
    spyOn(component, 'createNewQuote').and.callThrough();
    component.quoteText = 'Quote 1'
    let button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null)

    await fixture.whenStable();

    expect(component.createNewQuote).toHaveBeenCalled();
    expect(component.quoteList.length).toBe(1);
    expect(service.quoteList.length).toBe(1);
  });

  it("should disable the button when textArea is empty", () => {
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("button"));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it("should enable button when textArea is not empty", () => {
    component.quoteText = "I love this test";
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("button"));
    expect(button.nativeElement.disabled).toBeFalsy();
  });

  it("should remove post upon card click", async () => {
    component.quoteText = "This is a fresh post";
    fixture.debugElement.query(By.css('.btn-primary')).triggerEventHandler('click', null)
    fixture.detectChanges();
    expect(component.quoteList.length).toEqual(1);
    expect(service.quoteList.length).toEqual(1)

    fixture.debugElement.query(By.css(".card-parent")).children[0].triggerEventHandler("click", null)

    fixture.detectChanges();
    await fixture.whenStable()

    expect(component.quoteList.length).toEqual(0)
    expect(service.quoteList.length).toEqual(0)
  });

  it("should fetch data asynchronously", async () => {
    const fakedFetchedList = [
      new QuoteModel("I love unit testing", "Mon 4, 2018")
    ];
    const quoteService = fixture.debugElement.injector.get(QuoteService);
    let spy = spyOn(quoteService, "fetchQuotesFromServer").and.returnValue(
      Promise.resolve(fakedFetchedList)
    );

    await fixture.whenStable();

    expect(component.fetchedList).toEqual(fakedFetchedList);
  });

  it('should not run new macro task callback with delay after call tick with millis', fakeAsync(() => {
    function nestedTimer(cb: () => any): void {
      setTimeout(() => setTimeout(() => cb()));
    }
    const callback = jasmine.createSpy('callback');
    nestedTimer(callback);
    expect(callback).not.toHaveBeenCalled();
    tick(0, { processNewMacroTasksSynchronously: false });
    // the nested timeout will not be triggered
    expect(callback).not.toHaveBeenCalled();
    tick(0);
    expect(callback).toHaveBeenCalled();
  }));

  it('should get Date diff correctly in fakeAsync', fakeAsync(() => {
    const start = Date.now();
    tick(100);
    const end = Date.now();

    expect(end - start).toBe(100);
  }));

  it('should get Date diff correctly in fakeAsync with rxjs scheduler', fakeAsync(() => {
    // need to add `import 'zone.js/plugins/zone-patch-rxjs-fake-async'
    // to patch rxjs scheduler
    let result = '';
    of('hello')
      .pipe(delay(1000))
      .subscribe((v) => {
        result = v;
      });
    expect(result).toBe('');
    tick(1000);
    expect(result).toBe('hello');
    const start = new Date().getTime();
    let dateDiff = 0;
    interval(1000)
      .pipe(take(2))
      .subscribe(() => (dateDiff = new Date().getTime() - start));
    tick(1000);
    expect(dateDiff).toBe(1000);
    tick(1000);
    expect(dateDiff).toBe(2000);
  }));
});
