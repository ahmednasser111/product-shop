import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appCardShadow]',
})
export class CardShadowDirective {

  private el = inject(ElementRef);

  @HostListener('mouseenter') onEnter() {
    this.el.nativeElement.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
  }

  @HostListener('mouseleave') onLeave() {
    this.el.nativeElement.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
  }
}