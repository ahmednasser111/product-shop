// import { Component, inject } from '@angular/core';
// import { UserAuth } from '../../services/auth.service';
// import { RouterLink } from '@angular/router';
// import { User } from 'firebase/auth';
// import { IUser } from '../../models/user.model';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-update-profile',
//   imports: [RouterLink, FormsModule],
//   templateUrl: './update-profile.html',
//   styleUrl: './update-profile.css',
// })
// export class UpdateProfile {
//   authService = inject(UserAuth);
//   userUpdated: Partial<IUser> = this.authService.getUser() || {};
//   onUpdate() {
//     delete this.userUpdated._id;
//     const role = this.userUpdated.role;
//     delete this.userUpdated.role;
//     console.log({ userToUpdate: this.userUpdated });
//     const id = this.authService.getId();
//     if (id) this.authService.updateUser(id, this.userUpdated);
//     this.userUpdated.role = role;
//   }
// }
