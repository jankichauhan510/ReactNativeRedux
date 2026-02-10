import { ADD_TO_CART, REMOVE_FROM_CART } from './constant';

export interface CartItem {
  id: number;
  name: string;
  price: number;
}

export interface AddToCartAction {
  type: typeof ADD_TO_CART;
  data: CartItem;
}

export interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  id: number;
}

export type CartAction = AddToCartAction | RemoveFromCartAction;

export const addToCart = (item: CartItem): AddToCartAction => ({
  type: ADD_TO_CART,
  data: item,
});

export const removeFromCart = (id: number): RemoveFromCartAction => ({
  type: REMOVE_FROM_CART,
  id,
});
