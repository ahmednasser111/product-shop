import { ChangeDetectorRef, Component } from '@angular/core';
import { IUser } from '../../models/user.model';
import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UserAuth } from '../../services/auth.service';

type UserWithPaused = IUser & { paused: boolean };

@Component({
  selector: 'app-admin-users-panel',
  imports: [NgClass],
  templateUrl: './admin-users-panel.html',
  styleUrl: './admin-users-panel.css',
})
export class AdminUsersPanel {
  constructor(
    private http: HttpClient,
    private cd: ChangeDetectorRef,
    private auth:UserAuth
  ) {
    this.getUsers();
  }
  apiUrl = 'http://localhost:3000/users';
  users: UserWithPaused[] = [];

  async getUsers() {
    const token = await this.auth.getToken();
    this.http.get<any>(this.apiUrl,{headers:{
      Authorization: `Bearer ${token}`,
    }}).subscribe({
      next: (data) => {
        for (const user of data.users) {
          this.users.push({ ...user, paused: user.isPaused,id:user._id });
        }
        this.cd.detectChanges();
      },
      error(err) {
        console.log(err);
      },
    });
  }

  async pauseUser(user: any) {
    user.paused = true;
    const token = await this.auth.getToken();
    this.http.put<any>(this.apiUrl + '/pause/' + user.id, { isPaused: true }, {headers:{
      Authorization: `Bearer ${token}`,
    }}).subscribe({
      next: (data) => {
        console.log(data);
      },
      error(err) {
        console.log(err);
      },
    });
  }

  async resumeUser(user: any) {
    user.paused = false;
    const token = await this.auth.getToken();
    this.http.put<any>(this.apiUrl + '/pause/' + user.id, { isPaused: false }, {headers:{
      Authorization: `Bearer ${token}`,
    }}).subscribe({
      next: (data) => {
        console.log(data);
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
