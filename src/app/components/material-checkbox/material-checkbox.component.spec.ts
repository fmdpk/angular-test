import { MatCheckboxModule } from '@angular/material/checkbox';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialCheckboxComponent } from './material-checkbox.component';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { FormsModule } from '@angular/forms';

describe('MaterialCheckboxComponent', () => {
  let fixture: ComponentFixture<MaterialCheckboxComponent>;
  let loader: HarnessLoader;
  let component: MaterialCheckboxComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialCheckboxComponent],
      imports: [MatCheckboxModule, FormsModule], // Import Angular Material module
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialCheckboxComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set clicked to true when the Material button is clicked', async () => {
    // Arrange: Ensure the initial state is false
    expect(component.checked).toBeFalse();

    // Act: Use the harness to click the button
    const buttonHarness = await loader.getHarness(MatCheckboxHarness);
    await buttonHarness.check();

    // Assert: Verify the clicked property is now true
    expect(component.checked).toBeTrue();
  });
});
