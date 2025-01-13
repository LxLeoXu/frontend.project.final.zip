import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [],
  }),
  actions: {
    addToCart(product) {
      this.cart.push(product);
    },
    removeFromCart(index) {
      this.cart.splice(index, 1);
    },
  },
  getters: {
    cartTotal() {
      return this.cart.reduce((total, item) => total + item.price, 0);
    },
  },
});
