import axios from 'axios';

import { BASE_URL } from '../../services/api';

// Define action types
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const ADD_TO_WISHLIST_LIST = 'ADD_TO_WISHLIST_LIST';
export const REMOVE_FROM_WISHLIST_LIST = 'REMOVE_FROM_WISHLIST_LIST';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

// Define action creators

export const getProducts = () => {
  try {
    return async dispatch => {
      const response = await axios.get(`${BASE_URL}`);
      // console.log('DATA ========>', response.data);
      if (response.data) {
        dispatch({
          type: GET_PRODUCTS,
          payload: response.data
        });
           fetch(`${BASE_URL}`)
           .then(response => response.json())
           .then((products) => dipatch(success(products)))
      } else {
        console.log('Unable to fetch data from the API BASE URL!');
      }
    };
  } catch (error) {
    // Add custom logic to handle errors
    console.log(error);
  }
};

//Wishlist
export const addWishlist = product => dispatch => {
  dispatch({
    type: ADD_TO_WISHLIST_LIST,
    payload: product
  });
};

export const removeWishlist = product => dispatch => {
  dispatch({
    type: REMOVE_FROM_WISHLIST_LIST,
    payload: product
  });
};

//Cart
export const addToCart = product => dispatch => {
  dispatch({
    type: ADD_TO_CART,
    payload: product
  });
};

export const removeFromCart = product => dispatch => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: product
  });
};