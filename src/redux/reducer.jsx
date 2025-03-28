// import Orders from "../component/Orders/Orders";
import * as actionTypes from "./actionTypes";

const INGREDIENT_PRICE = {
  salad: 20,
  meat: 70,
  cheese: 30,
};
const INITIAL_STATE = {
  ingredient: [
    { type: "salad", amout: 0 },
    { type: "meat", amout: 0 },
    { type: "cheese", amout: 0 },
  ],
  order: [],
  ordersLoading: true,
  orderError: false,
  totalPrice: 80,
  purchasable: false,
  token: null,
  userId: null,
  authLoading: false,
  authFailedMsg: null,
};

export const reducer = (state = INITIAL_STATE, action) => {
  const ingredient = [...state.ingredient];
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      for (let item of ingredient) {
        if (item.type === action.payload) {
          item.amout++;
        }
      }
      return {
        ...state,
        ingredient: ingredient,
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.payload],
      };
    case actionTypes.REMOVE_INGREDIENT:
      for (let item of ingredient) {
        if (item.type === action.payload) {
          if (item.amout <= 0) return state;
          item.amout--;
        }
      }
      return {
        ...state,
        ingredient: ingredient,
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.payload],
      };

    case actionTypes.UPDATE_PURCHASABLE: {
      const sum = state.ingredient.reduce((sum, element) => {
        return sum + element.amout;
      }, 0);
      return {
        ...state,
        purchasable: sum > 0,
      };
    }
    case actionTypes.RESET_INGREDIENT:
      return {
        ...state,
        ingredient: [
          { type: "salad", amout: 0 },
          { type: "meat", amout: 0 },
          { type: "cheese", amout: 0 },
        ],
        totalPrice: 80,
        purchasable: false,
      };
    case actionTypes.LOAD_ORDERS: {
      let order = [];
      for (let key in action.payload) {
        order.push({
          ...action.payload[key],
          id: key,
        });
      }
      return {
        ...state,
        order: order,
        ordersLoading: false,
      };
    }
    case actionTypes.ORDERS_LOAD_FAILD:
      return {
        ...state,
        orderError: true,
        ordersLoading: false,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        authFailedMsg: null,
        token: null,
        userId: null,
      };
    case actionTypes.AUTH_LOADING:
      return {
        ...state,
        authLoading: action.payload,
      };
    case actionTypes.AUTH_FAILED:
      return {
        ...state,
        authFailedMsg: action.payload,
      };
    default:
      return state;
  }
};
