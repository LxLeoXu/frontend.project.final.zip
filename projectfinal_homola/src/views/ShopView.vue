<template>
  <div :class="['shop', isDarkMode ? 'dark-mode' : 'light-mode']">
    <!-- Ikona pre nákupný košík -->
    <div class="cart-icon-container" @click="toggleCartDropdown">
      <img src="@/components/icons/shopping-cart.svg" alt="Shopping Cart" class="cart-icon" />
      <span class="cart-count">{{ totalItems }}</span>
    </div>

    <!-- Komponent nákupného košíka -->
    <ShoppingCart v-if="showCartDropdown" />

    <h1 class="shop-title">Shop</h1>
    <div class="shop-container">
      <!-- Kategórie -->
      <div class="categories">
        <div
          v-for="category in categories"
          :key="category.id"
          :class="['category-box', isDarkMode ? 'dark-box' : 'light-box']"
          @click="loadProducts(category.products)"
        >
          <h2 :class="isDarkMode ? 'dark-text' : 'light-text'">{{ category.name }}</h2>
        </div>
      </div>

      <!-- Produkty -->
      <div v-if="selectedProducts.length > 0" class="products">
        <div
          v-for="product in selectedProducts"
          :key="product.id"
          :class="['product-card', isDarkMode ? 'dark-box' : 'light-box']"
        >
          <img
            :src="formatImagePath(product.image)"
            :alt="product.name"
            class="product-image"
          />
          <h2 :class="isDarkMode ? 'dark-text' : 'light-text'">{{ product.name }}</h2>
          <p :class="isDarkMode ? 'dark-text' : 'light-text'">Price: {{ product.price }}€</p>
          <button
            @click="addToCart(product)"
            :class="['add-to-cart', isDarkMode ? 'dark-button' : 'light-button']"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>

    <!-- Modálne okno s CheckoutForm -->
    <Modal v-if="showCheckoutModal" :isVisible="showCheckoutModal" @close="closeCheckoutModal">
      <CheckoutForm @submit="handleOrderSubmit" @cancel="closeCheckoutModal" />
    </Modal>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useCartStore } from "@/stores/cart"; // Import cart.js
import { useDarkModeStore } from "@/stores/darkMode";
import ShoppingCart from "@/components/ShoppingCard.vue";
import CheckoutForm from "@/components/CheckoutForm.vue";
import Modal from "@/components/Modal.vue";

export default {
  name: "ShopView",
  components: { ShoppingCart, CheckoutForm, Modal },
  setup() {
    // Importujeme store pre košík
    const cartStore = useCartStore();
    const darkModeStore = useDarkModeStore();

    const categories = ref([]); // Kategórie produktov
    const selectedProducts = ref([]); // Produkty v aktuálnej kategórii
    const loading = ref(true); // Načítanie údajov
    const showCartDropdown = ref(false); // Zobrazenie zoznamu košíka
    const showCheckoutModal = ref(false); // Zobrazenie CheckoutForm

    // Načítanie kategórií z JSON súboru
    const fetchCategories = async () => {
      try {
        const response = await fetch("/data/data2.json");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        categories.value = data.categories || [];
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        loading.value = false;
      }
    };

    // Funkcia na načítanie produktov pre vybranú kategóriu
    const loadProducts = (products) => {
      selectedProducts.value = products;
    };

    // Prepínanie zobrazenia košíka
    const toggleCartDropdown = () => {
      showCartDropdown.value = !showCartDropdown.value;
    };

    // Úprava cesty k obrázkom
    const formatImagePath = (path) => {
      return path.startsWith("/images") ? path : `/images${path}`;
    };

    // Funkcia pre potvrdenie objednávky
    const handleOrderSubmit = (formData) => {
      console.log("Order submitted:", formData);
      cartStore.clearCart(); // Vyprázdni košík
      showCheckoutModal.value = false; // Skryje modálne okno
    };

    // Funkcia na zatvorenie modálneho okna
    const closeCheckoutModal = () => {
      showCheckoutModal.value = false;
    };

    // Funkcia na zobrazenie CheckoutForm
    const checkout = () => {
      showCheckoutModal.value = true;
    };

    // Načítanie kategórií pri inicializácii
    fetchCategories();

    return {
      categories,
      selectedProducts,
      loading,
      showCartDropdown,
      addToCart: cartStore.addToCart, // Funkcia na pridanie do košíka z Pinia
      cartItems: computed(() => cartStore.items), // Položky v košíku
      totalItems: computed(() => cartStore.totalItems), // Celkový počet položiek
      totalAmount: computed(() => cartStore.totalAmount), // Celková cena
      loadProducts,
      toggleCartDropdown,
      formatImagePath,
      isDarkMode: computed(() => darkModeStore.isDarkMode),
      toggleDarkMode: darkModeStore.toggleDarkMode,
      showCheckoutModal,
      handleOrderSubmit,
      closeCheckoutModal,
      checkout,
    };
  },
};
</script>


<style scoped>
/* Rovnaké štýly pre ShopView */
.shop {
  padding: 20px;
}

.shop-title {
  text-align: center;
  margin-bottom: 20px;
}

.shop-container {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: flex-start;
}

/* Ikona pre košík */
.cart-icon-container {
  position: fixed;
  top: 20px;
  right: 20px;
  cursor: pointer;
  z-index: 1000;
}

.cart-icon {
  width: 32px;
  height: 32px;
}

.cart-count {
  background: red;
  color: white;
  border-radius: 50%;
  padding: 4px 8px;
  position: absolute;
  top: -5px;
  right: -10px;
  font-size: 12px;
}

/* Kategórie */
.categories {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.category-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  border-radius: 12px;
  width: 200px;
  height: 150px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.light-box {
  background: linear-gradient(135deg, #ffffff, #e0e0e0);
  color: #333;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.dark-box {
  background: linear-gradient(135deg, #333333, #444444);
  color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

.category-box:hover {
  transform: scale(1.05);
}

/* Produkty */
.products {
  flex: 2;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
  padding: 16px;
  width: 240px;
  text-align: center;
  transition: background 0.3s, transform 0.3s;
}

.product-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
}

.add-to-cart {
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.light-button {
  background-color: #007bff;
  color: white;
}

.dark-button {
  background-color: #444;
  color: white;
}

.add-to-cart:hover {
  transform: scale(1.05);
}
</style>
