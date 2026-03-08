import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserAuth } from '../../services/auth.service';
import { SignInWithGoogleButton } from '../../components/sign-in-with-google-button/sign-in-with-google-button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, SignInWithGoogleButton],
  templateUrl: './login.html',
})
export class Login {
  constructor(private cd: ChangeDetectorRef) {}

  private auth = inject(UserAuth);
  private router = inject(Router);

  error = '';
  isLoading = false;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get email() {
    return this.form.get('email')!;
  }
  get password() {
    return this.form.get('password')!;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this.auth.login(this.form.value.email!, this.form.value.password!).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/products']);
      },
      error: (err) => {
        this.isLoading = false;
        this.error = typeof err === 'string' ? err : err?.message || 'An error occurred during login';
        this.cd.detectChanges();
      },
    });
  }

  handleGoogleSignInError(error: any) {
    this.isLoading = false;
    this.error = typeof error === 'string' ? error : error?.message || 'An error occurred during Google Sign in';
    this.cd.detectChanges();
  }
}
