<template>
    <div class="shop">
      <h1>Shop</h1>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <!-- Zoznam produktov -->
        <div v-for="product in products" :key="product.id" class="product-card">
          <h2>{{ product.name }}</h2>
          <p>Price: {{ product.price }}€</p>
          <button @click="addToCart(product)">Add to Cart</button>
        </div>
  
        <!-- Košík -->
        <h2 class="cart-title">
          <img src="@/components/icons/Shopping-Cart-Full--Streamline-Ultimate.svg" alt="Shopping Cart" class="cart-icon" />
          Shopping Cart
        </h2>
        <ul>
          <li v-for="(item, index) in cartItems" :key="index">
            {{ item.name }} - {{ item.price }}€ x {{ item.quantity }}
            <button @click="removeFromCart(item.id)">Remove</button>
          </li>
        </ul>
        <p>Total: {{ totalAmount }}€</p>
        <button @click="clearCart" class="clear-cart-button">Clear Cart</button>
      </div>
    </div>
  </template>
  
  <script>
  import { useCartStore } from '@/stores/cart';
  
  export default {
    name: "ShopView",
    setup() {
      const cartStore = useCartStore();
  
      // Funkcia na načítanie produktov
      async function fetchProducts() {
        try {
          const response = await fetch('/data/products.json');
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          products.value = await response.json();
        } catch (error) {
          console.error('Error loading products:', error);
        } finally {
          loading.value = false;
        }
      }
  
      const products = ref([]);
      const loading = ref(true);
  
      // Načítanie produktov pri inicializácii
      fetchProducts();
  
      return {
        products,
        loading,
        cartItems: cartStore.items,
        totalAmount: cartStore.totalAmount,
        addToCart: cartStore.addToCart,
        removeFromCart: cartStore.removeFromCart,
        clearCart: cartStore.clearCart,
      };
    },
  };
  </script>
  
  <style scoped>
  .shop {
    padding: 20px;
  }
  
  .product-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
  }
  
  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    margin-top: 8px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  ul li {
    margin-bottom: 10px;
  }
  
  .cart-title {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .cart-icon {
    width: 24px;
    height: 24px;
  }
  
  .clear-cart-button {
    background-color: red;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 16px;
  }
  
  .clear-cart-button:hover {
    background-color: darkred;
  }
  </style>
  