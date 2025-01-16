<template>
    <div class="shop">
      <!-- Shopping Cart v pravom hornom rohu -->
      <div class="cart-icon-container" @click="toggleCartDropdown">
        <img src="@/components/icons/Shopping-Cart-Full--Streamline-Ultimate.svg" alt="Shopping Cart" class="cart-icon" />
        <span class="cart-count">{{ totalItems }}</span>
      </div>
  
      <!-- Dropdown pre Shopping Cart -->
      <div v-if="showCartDropdown" class="cart-dropdown">
        <h3>Shopping Cart</h3>
        <ul>
          <li v-for="(item, index) in cartItems" :key="index">
            {{ item.name }} - {{ item.price }}€ x {{ item.quantity }}
            <button @click="removeFromCart(item.id)">Remove</button>
          </li>
        </ul>
        <p>Total: {{ totalAmount }}€</p>
        <button @click="clearCart" class="clear-cart-button">Clear Cart</button>
        <button @click="showBuyModal" class="buy-button" :disabled="cartItems.length === 0">Buy</button>
      </div>
  
      <!-- Zoznam kategórií -->
      <h1>Shop</h1>
      <div v-if="loading">Loading categories...</div>
      <div v-else class="categories">
        <div 
          v-for="category in categories" 
          :key="category.id" 
          class="category-box" 
          @click="loadProducts(category.products)">
          <h2>{{ category.name }}</h2>
        </div>
      </div>
  
      <!-- Zoznam produktov -->
      <div v-if="selectedProducts.length > 0" class="products">
        <div v-for="product in selectedProducts" :key="product.id" class="product-card">
          <h2>{{ product.name }}</h2>
          <p>Price: {{ product.price }}€</p>
          <button @click="addToCart(product)">Add to Cart</button>
        </div>
      </div>
  
      <!-- Modálny formulár -->
      <CheckoutModal
        v-if="showModal"
        :show="showModal"
        @close="closeModal"
        @submit="handleCheckoutSubmit"
      />
    </div>
  </template>
  
  <script>
  import { ref, computed } from "vue";
  import { useCartStore } from "@/stores/cart";
  import CheckoutModal from "@/components/CheckoutForm.vue";
  
  export default {
    name: "ShopView",
    components: { CheckoutModal },
    setup() {
      const cartStore = useCartStore();
  
      const categories = ref([]);
      const selectedProducts = ref([]);
      const loading = ref(true);
      const showCartDropdown = ref(false);
      const showModal = ref(false);
  
      // Načítanie kategórií
      async function fetchCategories() {
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
      }
  
      const toggleCartDropdown = () => {
        showCartDropdown.value = !showCartDropdown.value;
      };
  
      const loadProducts = (products) => {
        selectedProducts.value = products;
      };
  
      const closeModal = () => {
        showModal.value = false;
      };
  
      const showBuyModal = () => {
        showModal.value = true;
      };
  
      const handleCheckoutSubmit = (formData) => {
        alert(`Thank you for your purchase, ${formData.firstName}!`);
        cartStore.clearCart();
        closeModal();
      };
  
      fetchCategories();
  
      return {
        categories,
        selectedProducts,
        loading,
        showCartDropdown,
        showModal,
        cartItems: computed(() => cartStore.items),
        totalItems: computed(() => cartStore.totalItems),
        totalAmount: computed(() => cartStore.totalAmount),
        addToCart: cartStore.addToCart,
        removeFromCart: cartStore.removeFromCart,
        clearCart: cartStore.clearCart,
        toggleCartDropdown,
        loadProducts,
        closeModal,
        showBuyModal,
        handleCheckoutSubmit,
      };
    },
  };
  </script>
  
  <style scoped>
  .shop {
    padding: 20px;
  }
  
  /* Košík v pravom hornom rohu */
  .cart-icon-container {
    position: fixed;
    top: 20px;
    right: 20px;
    cursor: pointer;
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
  
  /* Dropdown pre košík */
  .cart-dropdown {
    position: fixed;
    top: 60px;
    right: 20px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    width: 300px;
    padding: 16px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }
  
  /* Kategórie */
  .categories {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
  }
  
  .category-box {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    width: 200px;
    background-color: #f9f9f9;
    cursor: pointer;
    transition: transform 0.2s, background-color 0.2s;
  }
  
  .category-box:hover {
    transform: scale(1.05);
    background-color: #e0e0e0;
  }
  
  /* Produkty */
  .products {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
  }
  
  .product-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    width: 200px;
    text-align: center;
  }
  
  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  