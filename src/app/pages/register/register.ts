import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserAuth } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
})
export class Register {

  private auth   = inject(UserAuth);
  private router = inject(Router);

  error     = '';
  isLoading = false;

  form = new FormGroup({
    name:     new FormControl('', [Validators.required]),
    email:    new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  get name()     { return this.form.get('name')!; }
  get email()    { return this.form.get('email')!; }
  get password() { return this.form.get('password')!; }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    this.isLoading = true;

    this.auth.register(
      this.form.value.name!,
      this.form.value.email!,
      this.form.value.password!
    ).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/products']);
      },
      error: () => {
        this.isLoading = false;
        this.error = 'Registration failed. Try again.';
      }
    });
  }
}