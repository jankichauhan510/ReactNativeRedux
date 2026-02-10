import { ADD_TO_CART } from './constant';

export interface CartItem {
  id: number;
  name: string;
  price: number;
}

export interface AddToCartAction {
  type: typeof ADD_TO_CART;
  data: CartItem;
}

export const addToCart = (item: CartItem): AddToCartAction => {
  return {
    type: ADD_TO_CART,
    data: item,
  };
};
