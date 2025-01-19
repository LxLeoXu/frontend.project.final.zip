<template>
  <div :class="['shop', isDarkMode ? 'dark-mode' : 'light-mode']">
    <!-- Floating Cart Icon -->
    <div class="cart-icon-container" @click="toggleCartDropdown">
      <img src="@/components/icons/shopping-cart.svg" alt="Shopping Cart" class="cart-icon" />
      <span class="cart-count">{{ totalItems }}</span>
    </div>

    <!-- Shopping Cart Dropdown -->
    <ShoppingCart v-if="showCartDropdown" />

    <!-- Shop Title -->
    <header class="shop-header">
      <h1 class="shop-title">Explore Our Shop</h1>
      <p class="shop-subtitle">Browse categories and find your favorite products.</p>
    </header>

    <!-- Categories and Products -->
    <div class="shop-container">
      <!-- Categories Section -->
      <section class="categories">
        <h2 class="section-title">Categories</h2>
        <div class="categories-grid">
          <div
            v-for="category in categories"
            :key="category.id"
            class="category-box"
            @click="loadProducts(category.products)"
          >
            <h3 class="category-title">{{ category.name }}</h3>
          </div>
        </div>
      </section>

      <!-- Products Section -->
      <section v-if="selectedProducts.length > 0" class="products">
        <h2 class="section-title">Products</h2>
        <div class="products-grid">
          <div
            v-for="product in selectedProducts"
            :key="product.id"
            class="product-card"
          >
            <div class="image-window">
              <img
                :src="formatImagePath(product.image)"
                :alt="product.name"
                class="product-image"
              />
            </div>
            <h3 class="product-title">{{ product.name }}</h3>
            <p class="product-price">Price: {{ product.price }}€</p>
            <button @click="addToCart(product)" class="add-to-cart">
              Add to Cart
            </button>
          </div>
        </div>
      </section>
    </div>

    <!-- Pay Button -->
    <button class="pay-button" @click="toggleAddressForm">Proceed to Payment</button>

    <!-- Address Form -->
    <div v-if="showAddressForm" class="address-form-overlay">
      <div class="address-form">
        <h2>Shipping Address</h2>
        <form @submit.prevent="submitOrder">
          <div class="form-group">
            <label for="name">Full Name:</label>
            <input v-model="address.name" type="text" id="name" required />
          </div>

          <div class="form-group">
            <label for="address">Address:</label>
            <input v-model="address.address" type="text" id="address" required />
          </div>

          <div class="form-group">
            <label for="city">City:</label>
            <input v-model="address.city" type="text" id="city" required />
          </div>

          <div class="form-group">
            <label for="postal-code">Postal Code:</label>
            <input v-model="address.postalCode" type="text" id="postal-code" required />
          </div>

          <div class="form-buttons">
            <button type="submit" class="submit-button">Submit</button>
            <button type="button" class="cancel-button" @click="toggleAddressForm">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useCartStore } from "@/stores/cart";
import { useDarkModeStore } from "@/stores/darkMode";
import ShoppingCart from "@/components/ShoppingCard.vue";

export default {
  name: "ShopView",
  components: { ShoppingCart },
  setup() {
    const cartStore = useCartStore();
    const darkModeStore = useDarkModeStore();

    const categories = ref([]);
    const selectedProducts = ref([]);
    const showCartDropdown = ref(false);
    const showAddressForm = ref(false);

    const address = ref({
      name: "",
      address: "",
      city: "",
      postalCode: "",
    });

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
      }
    };

    const loadProducts = (products) => {
      selectedProducts.value = products.flatMap((product) =>
        product.type && product.items ? product.items : product
      );
    };

    const toggleCartDropdown = () => {
      showCartDropdown.value = !showCartDropdown.value;
    };

    const toggleAddressForm = () => {
      showAddressForm.value = !showAddressForm.value;
    };

    const formatImagePath = (path) => {
      return path?.startsWith("/images") ? path : `/images${path}`;
    };

    const submitOrder = () => {
      console.log("Order submitted with address:", address.value);
      cartStore.clearCart();
      showAddressForm.value = false;
      alert("Thank you for your purchase! Your order will be shipped soon.");
    };

    fetchCategories();

    return {
      categories,
      selectedProducts,
      showCartDropdown,
      addToCart: cartStore.addToCart,
      totalItems: computed(() => cartStore.totalItems),
      loadProducts,
      toggleCartDropdown,
      formatImagePath,
      isDarkMode: computed(() => darkModeStore.isDarkMode),
      toggleAddressForm,
      showAddressForm,
      address,
      submitOrder,
    };
  },
};
</script>

<style scoped>
/* Overlay for Address Form */
.address-form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.address-form {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  width: 400px;
}

.address-form h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
}

.submit-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-button {
  background-color: #ccc;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}

.cancel-button:hover {
  background-color: #999;
}

/* General Styles */
.shop {
  padding: 20px;
  font-family: "Roboto", sans-serif;
}

.shop-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.shop-subtitle {
  text-align: center;
  color: #555;
  margin-bottom: 30px;
}

.section-title {
  font-size: 1.8rem;
  margin-bottom: 20px;
  text-align: center;
}

/* Categories Grid */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.category-box {
  background: linear-gradient(135deg, #f0f0f0, #d9d9d9);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.category-box:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.category-title {
  font-size: 1.2rem;
  font-weight: bold;
}

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.product-card {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

/* Image Window */
.image-window {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
}

.product-image {
  max-width: 100%;
  height: auto;
  object-fit: contain;
}

/* Product Details */
.product-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 10px 0;
}

.product-price {
  color: #007bff;
  font-size: 1rem;
  margin-bottom: 15px;
}

/* Add to Cart Button */
.add-to-cart {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-to-cart:hover {
  background-color: #0056b3;
}

/* Dark Mode */
.dark-mode {
  background: #1e1e1e;
  color: #ccc;
}

.dark-mode .product-card {
  background: #2e2e2e;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
}

.dark-mode .category-box {
  background: linear-gradient(135deg, #333, #444);
}

.dark-mode .add-to-cart {
  background-color: #444;
}

.dark-mode .add-to-cart:hover {
  background-color: #555;
}
</style>