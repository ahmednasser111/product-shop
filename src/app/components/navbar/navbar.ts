import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { UserAuth } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
})
export class Navbar {
  themeService = inject(ThemeService);
  auth         = inject(UserAuth);
  private router = inject(Router);

  links = [
    { label: 'Home',      path: '/'          },
    { label: 'Products',  path: '/products'  },
  ];

  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}