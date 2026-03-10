import { Component, Inject, inject } from '@angular/core';
import { UserAuth } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  imports: [RouterLink],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage {
  // private auth = Inject(service)
  authService = inject(UserAuth);
}
