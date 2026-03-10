import { IProduct } from './product.model';
import { IUser } from './user.model';

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  product: IProduct;
  user: IUser;
  createdAt: string;
  updatedAt: string;
}
