import { Schema } from 'mongoose';

export type TOrder = {
  email: string;
  productId: Schema.Types.ObjectId;
  price: number;
  quantity: number;
};
