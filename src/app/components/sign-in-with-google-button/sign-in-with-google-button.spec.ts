import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInWithGoogleButton } from './sign-in-with-google-button';

describe('SignInWithGoogleButton', () => {
  let component: SignInWithGoogleButton;
  let fixture: ComponentFixture<SignInWithGoogleButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInWithGoogleButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInWithGoogleButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
