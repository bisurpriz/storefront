import { CartState } from "./types";

export type CartAction =
  | {
      type: "ADD_TO_CART";
      payload: CartState;
    }
  | {
      type: "REMOVE_FROM_CART";
      payload: CartState;
    }
  | {
      type: "CLEAR_CART";
      payload: CartState;
    }
  | {
      type: "UPDATE_CART";
      payload: CartState;
    };

const setLocalStorage = (state: CartState) => {
  localStorage.setItem("cart", JSON.stringify(state.cartItems));
  localStorage.setItem("count", JSON.stringify(state.count));
  localStorage.setItem("cost", JSON.stringify(state.cost));
};

export const cartReducer = (state: CartState, action: CartAction) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      setLocalStorage(action.payload);
      return action.payload;
    }

    case "REMOVE_FROM_CART": {
      setLocalStorage(action.payload);
      return action.payload;
    }

    case "UPDATE_CART": {
      setLocalStorage(action.payload);
      return action.payload;
    }
    case "CLEAR_CART": {
      setLocalStorage(action.payload);
      return action.payload;
    }
    default:
      return state;
  }
};
