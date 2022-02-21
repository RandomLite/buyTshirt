import {
    GET_PRODUCTS,
    ADD_TO_WISHLIST_LIST,
    REMOVE_FROM_WISHLIST_LIST,
    ADD_TO_CART,
    REMOVE_FROM_CART
  } from '../actions/productsActions';
  
  const initialState = {
    products: [],
    wishlists: [],
    carts: []
  };
  
  function productsReducer(state = initialState, action) {
    switch (action.type) {
      case GET_PRODUCTS:
        return { ...state, products: action.payload };
      case ADD_TO_WISHLIST_LIST:
        return { ...state, wishlists: [...state.wishlists, action.payload] };
      case REMOVE_FROM_WISHLIST_LIST:
        return {
          ...state,
          wishlists: state.wishlists.filter(product => product.id !== action.payload.id&&product.title !== action.payload.title)
      };
      case ADD_TO_CART:
        return { ...state, carts: [...state.carts, action.payload] };
      case REMOVE_FROM_CART:
        return {
          ...state,
          carts: state.carts.filter(product => product.id !== action.payload.id&&product.title !== action.payload.title)
      };
      default:
        return state;
    }
  }
  
  export default productsReducer;