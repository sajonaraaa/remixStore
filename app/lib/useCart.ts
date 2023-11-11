import { create } from "zustand";
import type {ProductId} from "./interface";

interface State {
    cart: ProductId[];
    totalItems: number;
    totalPrice: number;
    showCart: boolean;
}

interface Actions {
    addToCart: (Item: ProductId) => void;
    removeFromCart: (Item: ProductId) => void;
    toggleCart: () => void;
}

export const useLove = create<State & Actions>((set, get) => ({
    cart: [],
    totalItems: 0,
    totalPrice: 0,
    showCart: false,
    addToCart: (product: ProductId) => {
      const cart = get().cart
      const cartItem = cart.find((item) => item.slug.current === product.slug.current)

      if (cartItem) {
        const updateCart = cart.map((item)=> item.slug.current === product.slug.current ? {...item, quantity: item.quantity + 1} : item)     
    set((state) => ({cart: updateCart,
    totalItems: state.totalItems + 1,
    totalPrice: state.totalPrice + product.price,
      }),
    ); }
    else {
        const updatedCart = [...cart, {...product, quantity: 1}];
        set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + product.price,
        }));
    }
    },
    removeFromCart: (product: ProductId) => {
        set((state) => ({
            cart: state.cart.filter((item) => item.slug.current !== product.slug.current),
            totalItems: state.totalItems - 1,
            totalPrice: state.totalPrice - product.price,
            }))
    },

    toggleCart: () => 
        set((state) => ({
                showCart: !state.showCart,
            })
        ),
                
}));