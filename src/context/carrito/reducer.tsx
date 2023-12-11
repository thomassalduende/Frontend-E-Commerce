'use client'
import { useCartCount } from "./countCart";

export type CartItemType = {
    isbn: string;
    quantity: number;
    nombre: string;
    url_imagen: string;
    precio: number;
    stock: number;
    descuento: number;
    descripcion: string;
    editorial: {
        nombre: string;
    }
    genero: {
        nombre: string;
    }[]
    autor: {
        nombre: string;
    }[]
};

export type ActionType = {
    type: string;
    payload: any; // Puedes definir un tipo más específico para payload si es necesario
};

let savedCartString: string | null = null;

if (typeof window !== 'undefined') {
    savedCartString = window.localStorage.getItem('cart');
}

export const initialState: CartItemType[] = (savedCartString !== null ? JSON.parse(savedCartString) : []) || [];

export const CART_ACTION_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CLEAR_CART: 'CLEAR_CART',
};

export const updateLocalStorage = (state: CartItemType[]): void => {
    window.localStorage.setItem('cart', JSON.stringify(state));
};

export const CartReducer = (state: CartItemType[], action: ActionType): CartItemType[] => {
    const { count } = useCartCount();
    const { type: actionType, payload: actionPayload } = action;

    switch (actionType) {
        case CART_ACTION_TYPES.ADD_TO_CART: {
            const { isbn, stock } = actionPayload as { isbn: string; stock: number };
            const productInCartIndex = state.findIndex(item => item.isbn === isbn);

            if (productInCartIndex >= 0) {
                const newState = [...state];
                if (newState[productInCartIndex].quantity < stock) {
                    newState[productInCartIndex].quantity = newState[productInCartIndex].quantity + 1;
                }
                updateLocalStorage(newState);
                return newState;
            }

            const newState: CartItemType[] = [
                ...state,
                {
                    ...(actionPayload as CartItemType), // product
                    quantity: count,
                },
            ];
            updateLocalStorage(newState);
            return newState;
        }

        case CART_ACTION_TYPES.REMOVE_FROM_CART: {
            const { isbn } = actionPayload as { isbn: string };
            const newState = state.filter(item => item.isbn !== isbn);
            updateLocalStorage(newState);
            return newState;
        }

        case CART_ACTION_TYPES.CLEAR_CART: {
            const { isbn } = actionPayload as { isbn: string };
            const productInCartIndex = state.findIndex(item => item.isbn === isbn);

            if (productInCartIndex >= 0) {
                const newState = [...state];
                if (newState[productInCartIndex].quantity > 1) {
                    newState[productInCartIndex].quantity -= 1;
                }
                if (newState[productInCartIndex].quantity === 0) {
                    const newFilteredState = newState.filter(item => item.isbn !== isbn);
                    updateLocalStorage(newFilteredState);
                    return newFilteredState;
                }
                updateLocalStorage(newState);
                return newState;
            }
            break;
        }
    }

    return state;
};
