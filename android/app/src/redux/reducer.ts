import { ADD_TO_CART } from './constant';
import { AddToCartAction, CartItem } from './action';

const initialState: CartItem[] = [];

type CartAction = AddToCartAction;

export const reducer = (
  state: CartItem[] = initialState,
  action: CartAction,
): CartItem[] => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.data];

    default:
      return state;
  }
};
