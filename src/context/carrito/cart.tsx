'use client'
import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { CartReducer, initialState, CartItemType, ActionType } from '@/context/carrito/reducer';
import { type Producto } from '@/types/types';

type CartContextType = {
    cart: CartItemType[];
    addToCart: (product: Producto) => void;
    removeFromCart: (product: Producto) => void;
    clearCart: (product: Producto) => void;
};

export const CartContext = createContext<CartContextType>({
    cart: [],
    addToCart: () => { },
    removeFromCart: () => { },
    clearCart: () => { }
});

function useCartReducer(): CartContextType {
    const [state, dispatch] = useReducer(CartReducer, initialState);

    const addToCart = (product: Producto) => dispatch({
        type: 'ADD_TO_CART',
        payload: product
    });

    const removeFromCart = (product: Producto) => dispatch({
        type: 'REMOVE_FROM_CART',
        payload: product
    });

    const clearCart = (product: Producto) => dispatch({
        type: 'CLEAR_CART',
        payload: product
    });

    return { cart: state, addToCart, removeFromCart, clearCart };
}

type CartProviderProps = {
    children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps): JSX.Element {
    const { cart, addToCart, removeFromCart, clearCart } = useCartReducer();

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            clearCart
        }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = (): CartContextType => {
    return useContext(CartContext);
};

