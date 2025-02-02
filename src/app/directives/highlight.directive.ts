import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
} from '@angular/core';

@Directive({ selector: '[highlight]' })
/**
 * Set backgroundColor for the attached element to highlight color
 * and set the element's customProperty to true
 */
export class HighlightDirective implements OnChanges {
  defaultColor = 'rgb(211, 211, 211)'; // lightgray
  @Input('highlight') bgColor = '';
  constructor(private el: ElementRef) {
    el.nativeElement.style.customProperty = true;
  }
  ngOnChanges() {
    this.el.nativeElement.style.backgroundColor =
      this.bgColor || this.defaultColor;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string | null) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
