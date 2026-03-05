import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuth } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in-with-google-button',
  imports: [],
  templateUrl: './sign-in-with-google-button.html',
  styleUrl: './sign-in-with-google-button.css',
})
export class SignInWithGoogleButton {
  constructor(
    private authService: UserAuth,
    private router: Router,
  ) {}

  signInWithGoogle() {
    this.authService.signInWithGoogle().subscribe((user) => {
      this.router.navigate(['/products']);
    });
  }
}
