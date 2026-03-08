import { IProduct } from './product.model';

export interface Cart {
  message: string;
  order: Order;
}
export interface Order {
  usrId: string;
  prdQtyList: prdQty[];
}
export interface prdQty {
  prdId: string;
  quantity: number;
  productDetails?: IProduct;
}
