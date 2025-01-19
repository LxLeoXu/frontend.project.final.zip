import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", () => {
  const items = ref([]);

  const totalItems = computed(() =>
    items.value.reduce((total, item) => total + item.quantity, 0)
  );

  const totalAmount = computed(() =>
    items.value.reduce((total, item) => total + item.price * item.quantity, 0)
  );

  function addToCart(product, type = "single") {
    const existingItem = items.value.find(
      (item) => item.id === product.id && item.type === type
    );
    if (existingItem) {
      existingItem.quantity++;
    } else {
      items.value.push({ ...product, quantity: 1, type });
    }
    saveCart();
  }

  function removeFromCart(productId, type = "single") {
    const product = items.value.find(
      (item) => item.id === productId && item.type === type
    );
    if (product) {
      items.value = items.value.filter(
        (item) => item.id !== productId || item.type !== type
      );
      saveCart();
    }
  }

  function clearCart() {
    items.value = [];
    saveCart();
  }

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(items.value));
  }

  function loadCart() {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        items.value = JSON.parse(savedCart);
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  }

  loadCart();

  return {
    items,
    totalItems,
    totalAmount,
    addToCart,
    removeFromCart,
    clearCart,
  };
});
