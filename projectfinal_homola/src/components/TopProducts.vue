<template>
  <div class="top-products">
    <h2>Top Products</h2>
    <div v-if="loading">Loading top products...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-if="filteredProducts.length > 0">
        <div v-for="product in filteredProducts" :key="product.id" class="product-card">
          <img :src="product.image" :alt="product.name" class="product-image" />
          <h3>{{ product.name }}</h3>
          <p>{{ product.price }}€</p>
          <p>{{ product.description }}</p>
          <button @click="addToCart(product)">Add to Cart</button>
        </div>
      </div>
      <div v-else>No products available.</div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useCartStore } from "@/stores/cart";

export default {
  name: "TopProducts",
  setup() {
    const cartStore = useCartStore();
    const products = ref([]);
    const loading = ref(true);
    const error = ref(null);

    // Funkcia na načítanie produktov
    async function fetchProducts() {
  try {
    const response = await fetch("/data/data.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    if (!data.products || !Array.isArray(data.products)) {
      throw new Error("Invalid data format: 'products' key is missing or not an array.");
    }
    products.value = data.products;
  } catch (err) {
    console.error("Error loading products:", err);
    error.value = "Failed to load products. Please try again later.";
  } finally {
    loading.value = false;
  }
}


    // Filtruje produkty podľa slugu
    const filteredProducts = computed(() =>
      products.value.filter((product) => product.slug === "top-products")
    );

    // Pridanie do košíka
    function addToCart(product) {
      cartStore.addToCart(product);
    }

    // Načítanie produktov pri načítaní komponentu
    fetchProducts();

    return {
      products,
      filteredProducts,
      loading,
      error,
      addToCart,
    };
  },
};
</script>

<style scoped>
.top-products {
  margin-top: 20px;
}

.product-card {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  text-align: center;
}

.product-image {
  width: 100px;
  height: auto;
  margin-bottom: 10px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
