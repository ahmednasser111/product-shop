import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPrice } from './total-price';

describe('TotalPrice', () => {
  let component: TotalPrice;
  let fixture: ComponentFixture<TotalPrice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalPrice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalPrice);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
