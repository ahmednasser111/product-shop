export type Role = 'admin' | 'user' | 'vendor';

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  isVerified: boolean;
}
