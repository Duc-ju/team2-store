import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
  name: 'cart',
  initialState: {
    current: null,
    isLoading: false,
    isShown: false,
    isAddToCartPending: false,
  },
  reducers: {
    show: (state) => {
      state.isShown = true;
    },
    close: (state) => {
      state.isShown = false;
    },
    setFetching: (state) => {
      state.isLoading = true;
    },
    setSuccess: (state, action) => {
      const cart = action.payload;
      cart.quantity = cart.cartProducts.reduce((previousValue, cartProduct) => {
        return previousValue + cartProduct.quantity;
      }, 0)
      cart.total = cart.cartProducts.reduce((previousValue, cartProduct) => {
        return previousValue + cartProduct.quantity*(cartProduct.productItem.prices*(1-cartProduct.productItem.discount));
      }, 0)
      state.current = {...cart};
      state.isLoading = false;
    },
    setUpdate: (state, action) => {
      let currentCart = state.current;
      let total = 0;
      let quantity = 0;
      let check = false;
      currentCart.cartProducts.forEach(cartProduct => {
        if(cartProduct.id===action.payload.id){
          cartProduct.quantity = action.payload.quantity;
          check = true;
        }
      })
      if(!check) {
        currentCart.cartProducts = [...state.current.cartProducts, action.payload];
      }
      currentCart.quantity = currentCart.cartProducts.reduce((previousValue, cartProduct) => {
        return previousValue + cartProduct.quantity;
      }, 0)
      currentCart.total = currentCart.cartProducts.reduce((previousValue, cartProduct) => {
        return previousValue + cartProduct.quantity*(cartProduct.productItem.prices*(1-cartProduct.productItem.discount));
      }, 0)
      state.current = {...currentCart}
      state.isLoading = false;
    },
    setDelete: (state, action) => {
      let currentCart = state.current;
      currentCart.cartProducts = currentCart.cartProducts
          .filter((cartProduct) => cartProduct.id!==action.payload);
      currentCart.quantity = currentCart.cartProducts.reduce((previousValue, cartProduct) => {
        return previousValue + cartProduct.quantity;
      }, 0)
      currentCart.total = currentCart.cartProducts.reduce((previousValue, cartProduct) => {
        return previousValue + cartProduct.quantity*(cartProduct.productItem.prices*(1-cartProduct.productItem.discount));
      }, 0)
      state.current = {...currentCart};
      state.isLoading = false;
    }
  },
});
