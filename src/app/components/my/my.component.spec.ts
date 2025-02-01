import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyComponent } from './my.component';
import { DataService } from 'src/app/services/data.service';
import { of } from 'rxjs';

// const stubDataService = {
//   getData: () => of('Stubbed Data')
// };

describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyComponent ],
      providers: [DataService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should display stubbed data', () => {
  //   const nativeElement = fixture.nativeElement;
  //   expect(nativeElement.querySelector('p').textContent).toContain('Stubbed Data');
  // });

  it('should call getData and display mock data', () => {
    const spy = spyOn(dataService, 'getData').and.returnValue(of('mockValue'));
    component.ngOnInit();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('mockValue');
    expect(component.data).toBe('mockValue');
    expect(dataService.getData).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });
  
  
});
