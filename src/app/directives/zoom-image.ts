import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({ selector: '[appZoomImage]'})
export class ZoomImageDirective {
  private el = inject(ElementRef);

  @HostListener('mouseenter') onEnter() {
    this.el.nativeElement.style.transform = 'scale(1.08)';
  }

  @HostListener('mouseleave') onLeave() {
    this.el.nativeElement.style.transform = 'scale(1)';
  }
}