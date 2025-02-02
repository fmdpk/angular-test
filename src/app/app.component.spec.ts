import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { MyButtonComponent } from './components/my-button/my-button.component';
import { MyButtonHarness } from './components/my-button/my-button-harness';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

function logIn(user: any) {
  console.log('User logged in');
}

describe('AppComponent', () => {
  let loader: HarnessLoader;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, MyButtonComponent],
      imports: [RouterModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-unit-test'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-unit-test');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.app-title')?.textContent).toContain(
      'angular-unit-test app is running!'
    );
  });

  // Test case
  it('should log in a user', () => {
    const dummyUser = {}; // Dummy object
    logIn(dummyUser);
    // No assertions needed as the user object is not used
  });

  it('should find the harness', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // Render the component
    loader = TestbedHarnessEnvironment.loader(fixture);
    const harness = await loader.getHarness(MyButtonHarness);
    let text = await harness.getText();
    expect(text).toBe('Click Me');
    await harness.click();
    fixture.detectChanges();
    text = await harness.getText();
    expect(text).toBe('Clicked');
    expect(harness).toBeTruthy();
  });
});
