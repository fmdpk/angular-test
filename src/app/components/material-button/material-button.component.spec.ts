import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MaterialButtonComponent } from './material-button.component';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';

describe('MaterialButtonComponent', () => {
  let fixture: ComponentFixture<MaterialButtonComponent>;
  let loader: HarnessLoader;
  let component: MaterialButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialButtonComponent],
      imports: [MatButtonModule], // Import Angular Material module
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialButtonComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set clicked to true when the Material button is clicked', async () => {
    // Arrange: Ensure the initial state is false
    expect(component.clicked).toBeFalse();

    // Act: Use the harness to click the button
    const buttonHarness = await loader.getHarness(MatButtonHarness);
    await buttonHarness.click();

    // Assert: Verify the clicked property is now true
    expect(component.clicked).toBeTrue();
  });
});
