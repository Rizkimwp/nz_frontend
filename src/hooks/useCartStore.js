import { create } from "zustand";

export const useCartStore = create((set, get) => ({
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    setCart: (updatedCart) => {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        set({ cart: updatedCart });
    },
    addToCart: (product, quantity) => {
        const cart = get().cart;
        const updatedCart = [...cart];
        const existingItemIndex = updatedCart.findIndex((item) => item.id === product.id);

        if (existingItemIndex !== -1) {
            updatedCart[existingItemIndex].quantity += quantity;
        } else {
            updatedCart.push({ ...product, quantity });
        }

        set({ cart: updatedCart });
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    },
    removeFromCart: (productId) => {
        const updatedCart = get().cart.filter((item) => item.id !== productId);
        set({ cart: updatedCart });
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    },
    clearCart: () => {
        localStorage.removeItem("cart");
        set({ cart: [] });
    },
}));
