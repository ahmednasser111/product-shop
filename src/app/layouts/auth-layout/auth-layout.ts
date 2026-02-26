import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  
  imports: [RouterOutlet],
  template: `
    <div class="min-h-screen bg-slate-100 flex items-center justify-center">
      <router-outlet />
    </div>
  `,
})
export class AuthLayout {}
