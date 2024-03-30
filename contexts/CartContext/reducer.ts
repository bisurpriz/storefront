import { ProductForOrder } from "@/common/types/Cart/cart";

export type CartAction =
  | {
      type: "ADD_TO_CART";
      payload: ProductForOrder;
    }
  | {
      type: "REMOVE_FROM_CART";
      payload: number | string;
    }
  | { type: "CLEAR_CART" }
  | {
      type: "UPDATE_CART";
      payload: ProductForOrder;
    }
  | {
      type: "SET_ALL_CART";
      payload: ProductForOrder[];
    };

export const reducer = (state: ProductForOrder[], action: CartAction) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const isExist = state.findIndex((item) => item.id === action.payload.id);
      if (isExist !== -1) {
        if (action.payload.quantity < state[isExist].quantity) {
          const _state = [...state];
          _state[isExist] = {
            ..._state[isExist],
            quantity: action.payload.quantity,
          };
          return _state;
        }

        const _state = [...state];
        _state[isExist] = {
          ..._state[isExist],
          quantity: _state[isExist].quantity + 1,
        };
        return _state;
      }

      return [...state, { ...action.payload, quantity: 1 }];

    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload);

    case "UPDATE_CART":
      const _state = [...state];
      const index = _state.findIndex((item) => item.id === action.payload.id);
      _state[index] = action.payload;
      return _state;

    case "CLEAR_CART":
      return [];

    case "SET_ALL_CART":
      return action.payload;

    default:
      return state;
  }
};
