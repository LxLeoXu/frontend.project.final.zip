import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", () => {
  // Stav košíka
  const items = ref([]);

  // Počet položiek v košíku
  const totalItems = computed(() =>
    items.value.reduce((total, item) => total + item.quantity, 0)
  );

  // Celková cena
  const totalAmount = computed(() =>
    items.value.reduce((total, item) => total + item.price * item.quantity, 0)
  );

  // Funkcia na pridanie položky do košíka
  function addToCart(product, type = "single") {
    // Ak je produkt typu "konfigurácia", pridá ho ako celú konfiguráciu
    if (type === "configuration") {
      const existingConfig = items.value.find(
        (item) => item.type === "configuration" && item.id === product.id
      );
      if (existingConfig) {
        notify(`Konfigurácia už existuje v košíku.`);
      } else {
        items.value.push({
          ...product,
          type: "configuration",
          quantity: 1,
        });
        notify(`Konfigurácia bola pridaná do košíka.`);
      }
    } else {
      // Pridanie jednotlivých komponentov
      const existingItem = items.value.find(
        (item) => item.id === product.id && item.type === "single"
      );
      if (existingItem) {
        existingItem.quantity++;
        notify(`Zvýšené množstvo "${product.name}" v košíku.`);
      } else {
        items.value.push({ ...product, quantity: 1, type: "single" });
        notify(`Pridané "${product.name}" do košíka.`);
      }
    }
    saveCart();
  }

  // Funkcia na odstránenie položky z košíka
  function removeFromCart(productId, type = "single") {
    const product = items.value.find(
      (item) => item.id === productId && item.type === type
    );
    if (product) {
      items.value = items.value.filter(
        (item) => item.id !== productId || item.type !== type
      );
      saveCart();
      notify(`Odstránené "${product.name}" z košíka.`);
    }
  }

  // Funkcia na vymazanie celého košíka
  function clearCart() {
    items.value = [];
    saveCart();
    notify("Košík bol vymazaný.");
  }

  // Ukladanie do localStorage
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(items.value));
  }

  // Načítanie z localStorage
  function loadCart() {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        items.value = JSON.parse(savedCart);
      }
    } catch (error) {
      console.error("Chyba pri načítaní košíka z localStorage:", error);
    }
  }

  // Funkcia na zobrazenie notifikácie
  function notify(message) {
    console.log(message); // Tu môžete nahradiť vlastným toast/alert systémom
  }

  // Načítanie košíka pri inicializácii
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
