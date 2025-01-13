import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', () => {
  const count = ref(0);

  // Nové výpočty
  const doubleCount = computed(() => count.value * 2);
  const tripleCount = computed(() => count.value * 3);

  // Nové akcie
  function increment() {
    count.value++;
  }

  function decrement() {
    count.value--;
  }

  function reset() {
    count.value = 0;
  }

  return { count, doubleCount, tripleCount, increment, decrement, reset };
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
  }

  // Funkcia na odstránenie položky z košíka
  function removeFromCart(productId) {
    items.value = items.value.filter((item) => item.id !== productId);
    saveCart();
  }

  // Funkcia na vymazanie celého košíka
  function clearCart() {
    items.value = [];
    saveCart();
  }

  // Ukladanie do localStorage
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(items.value));
  }

  // Načítanie z localStorage
  function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      items.value = JSON.parse(savedCart);
    }
  }

  // Načítanie košíka pri inicializácii
  loadCart();

  return { items, totalItems, totalAmount, addToCart, removeFromCart, clearCart };
});
