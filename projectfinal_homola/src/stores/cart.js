import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', () => {
  // Stav košíka
  const items = ref([]);

  // Počet položiek v košíku
  const totalItems = computed(() => items.value.reduce((total, item) => total + item.quantity, 0));

  // Celková cena
  const totalAmount = computed(() => items.value.reduce((total, item) => total + item.price * item.quantity, 0));

  // Funkcia na pridanie položky do košíka
  function addToCart(product) {
    const existingItem = items.value.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      items.value.push({ ...product, quantity: 1 });
    }
    saveCart();
    notify(`Added "${product.name}" to the cart.`);
  }

  // Funkcia na odstránenie položky z košíka
  function removeFromCart(productId) {
    const product = items.value.find((item) => item.id === productId);
    if (product) {
      items.value = items.value.filter((item) => item.id !== productId);
      saveCart();
      notify(`Removed "${product.name}" from the cart.`);
    }
  }

  // Funkcia na vymazanie celého košíka
  function clearCart() {
    items.value = [];
    saveCart();
    notify("Cleared the cart.");
  }

  // Ukladanie do localStorage
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(items.value));
  }

  // Načítanie z localStorage
  function loadCart() {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        items.value = JSON.parse(savedCart);
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    }
  }

  // Funkcia na zobrazenie notifikácie
  function notify(message) {
    // Jednoduchý príklad, nahradiť vlastným riešením (napr. Toast)
    console.log(message);
  }

  // Načítanie košíka pri inicializácii
  loadCart();

  return { items, totalItems, totalAmount, addToCart, removeFromCart, clearCart };
});
