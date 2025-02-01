import { TestBed } from '@angular/core/testing';
import { HighlightDirective } from './highlight.directive';
import { ElementRef } from '@angular/core';

describe('HighlightDirective', () => {
  let directive: HighlightDirective;
  let mockElementRef: ElementRef;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HighlightDirective],
    });
    mockElementRef = {
      nativeElement: document.createElement('div'), // Mock a native DOM element
    };
    directive = new HighlightDirective(mockElementRef);
  });

  it('should create the directive', () => {
    expect(directive).toBeTruthy();
  });

  it('should change background color on mouseenter', () => {
    // Trigger the mouseenter event
    directive.onMouseEnter();
    expect(mockElementRef.nativeElement.style.backgroundColor).toBe('yellow');
  });

  it('should remove background color on mouseleave', () => {
    // Trigger mouseenter and then mouseleave
    directive.onMouseEnter();
    directive.onMouseLeave();
    expect(mockElementRef.nativeElement.style.backgroundColor).toBe('');
  });
});
