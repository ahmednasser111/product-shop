import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { UserAuth } from '../../services/auth.service';
import { Role } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
})
export class Navbar {
  themeService = inject(ThemeService);
  auth = inject(UserAuth);
  private router = inject(Router);

  links = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Cart', path: '/shopping-cart' },
  ];
  constructor() {
    const role = this.auth.getUser()?.role;
    if (role == ('seller' as Role)) {
      this.links.push({ label: 'Dashboard', path: '/seller-dashboard' });
    } else if (role == ('admin' as Role)) {
      this.links.push({ label: 'Users', path: '/admin-users-panel' });
      this.links.push({ label: 'Categories', path: '/categories' });
    } else if (role == ('user' as Role)) {
      this.links.push({ label: 'My Lists', path: '/my-reviews' });
    }
  }

  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
