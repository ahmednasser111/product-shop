export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  category: { id: string; name: string } | any;
  image: string;
  stock: number;
  sellerId: string;
  createdAt: string;
  updatedAt: string;
}
