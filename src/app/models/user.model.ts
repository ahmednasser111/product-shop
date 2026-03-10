export type Role = 'admin' | 'user' | 'vendor';

export interface IUser {
  _id?: string;
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  isVerified: boolean;
  isPaused?: boolean;
  address?: string;
}
