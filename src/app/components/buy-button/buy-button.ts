import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-buy-button',
  templateUrl: './buy-button.html',
})
export class BuyButton {
  @Input() title: string = "Buy Now";
  @Input() color: string = "blue";
  @Input() fun: () => void = () => {};

  onClick() {
    this.fun();
  }
}
