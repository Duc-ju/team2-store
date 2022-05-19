import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
    name: 'cart',
    initialState: {
        current: null,
        isLoading: false,
        isShown: false,
        isAddToCartPending: false
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
            const cart = {};
            const bookItems = action.payload.bookItems.map((item) => ({
                ...item,
                type: 'book',
                quantity: 1
            }));
            const clothesItems = action.payload.clothesItems.map((item) => ({
                ...item,
                type: 'clothes',
                quantity: 1
            }));
            const laptopItems = action.payload.laptopItems.map((item) => ({
                ...item,
                type: 'laptop',
                quantity: 1
            }));
            const cartProducts = [
                ...bookItems,
                ...clothesItems,
                ...laptopItems
            ];
            cart.id = action.payload.id;
            cart.cartProducts = cartProducts;
            cart.quantity = cartProducts.length;
            cart.total = cartProducts.reduce((previousValue, cartProduct) => {
                return (
                    previousValue +
                    cartProduct.price * (1 - cartProduct.discount)
                );
            }, 0);
            state.current = { ...cart };
            state.isLoading = false;
        },
        setUpdate: (state, action) => {
            const cart = {};
            const currentCart = state.current;
            const item = action.payload;
            if (item.book) item.type = 'book';
            if (item.laptop) item.type = 'laptop';
            if (item.clothes) item.type = 'clothes';
            item.quantity = 1;
            const cartProducts = [...currentCart.cartProducts, item];
            cart.id = currentCart.id;
            cart.cartProducts = [...cartProducts];
            cart.quantity = cartProducts.length;
            cart.total = cartProducts.reduce((previousValue, cartProduct) => {
                return (
                    previousValue +
                    cartProduct.price * (1 - cartProduct.discount)
                );
            }, 0);
            state.current = { ...cart };
            state.isLoading = false;
        },
        setDelete: (state, action) => {
            const item = { ...action.payload };
            if (item.book) item.type = 'book';
            if (item.laptop) item.type = 'laptop';
            if (item.clothes) item.type = 'clothes';
            const cart = {};
            const currentCart = state.current;
            const cartProducts = currentCart.cartProducts.filter(
                (cartProduct) => {
                    if (
                        item.id === cartProduct.id &&
                        item.type === cartProduct.type
                    )
                        return false;
                    return true;
                }
            );
            cart.id = currentCart.id;
            cart.cartProducts = [...cartProducts];
            cart.quantity = cartProducts.length;
            cart.total = cartProducts.reduce((previousValue, cartProduct) => {
                return (
                    previousValue +
                    cartProduct.price * (1 - cartProduct.discount)
                );
            }, 0);
            state.current = { ...cart };
            state.isLoading = false;
        }
    }
});
