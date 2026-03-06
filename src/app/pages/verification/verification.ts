import { Component, ChangeDetectorRef } from '@angular/core';
import { UserAuth } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-verification',
  imports: [],
  templateUrl: './verification.html',
  styleUrl: './verification.css',
})
export class Verification {
  public resending: boolean = false;

  constructor(
    private cd: ChangeDetectorRef,
    private authService: UserAuth,
    private router: Router,
    private auth: Auth,
  ) {
    this.authService.isLogged().subscribe({
      next: (isLogged) => {
        if (isLogged && this.auth.currentUser?.emailVerified) {
          this.router.navigate(['/']);
        }
      },
    });
  }

  handleResend() {
    this.resending = true;
    this.authService.sendVerificationEmail().subscribe({
      next: () => {
        this.resending = false;
        this.cd.detectChanges();
      },
      error: (error) => {
        this.resending = false;
        console.log(error);
        this.cd.detectChanges();
      },
    });
  }
}
