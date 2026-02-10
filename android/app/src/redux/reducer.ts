import { ADD_TO_CART, REMOVE_FROM_CART } from './constant';
import { CartItem, CartAction } from './action';

const initialState: CartItem[] = [];

const cartReducer = (state = initialState, action: CartAction): CartItem[] => {
  switch (action.type) {
    case ADD_TO_CART:
      // prevent duplicate items
      if (state.find(item => item.id === action.data.id)) {
        return state;
      }
      return [...state, action.data];

    case REMOVE_FROM_CART:
      return state.filter(item => item.id !== action.id);

    default:
      return state;
  }
};

export default cartReducer;
