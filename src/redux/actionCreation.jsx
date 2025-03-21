import * as actionTypes from "./actionTypes";
import axios from "axios";

export const addIngredient = (type) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: type,
  };
};
export const removeIngredient = (type) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload: type,
  };
};

export const updatePurchasable = () => {
  return {
    type: actionTypes.UPDATE_PURCHASABLE,
  };
};

export const resetIngredient = () => {
  return {
    type: actionTypes.RESET_INGREDIENT,
  };
};

export const loadOrders = (order) => {
  return {
    type: actionTypes.LOAD_ORDERS,
    payload: order,
  };
};

export const orderLoadFaild = () => {
  return {
    type: actionTypes.ORDERS_LOAD_FAILD,
  };
};

export const fetchOrder = () => (dispatch) => {
  axios
    .get(
      "https://burger-builder-app-c1d0f-default-rtdb.firebaseio.com/order.json"
    )
    .then((response) => {
      dispatch(loadOrders(response.data));
    })
    .catch((err) => {
      dispatch(orderLoadFaild(err));
    });
};
