<script>
import TopProducts from "@/components/TopProducts.vue";
import productsData from "@/data/data.json";
import { useCounterStore } from "@/stores/counter";
import { useCartStore } from "@/stores/cart";
import { ref, computed } from "vue";
import { useRouter } from "vue-router"; // Import Vue Router composable

export default {
  name: "HomeView",
  components: { TopProducts },
  setup() {
    // Router
    const router = useRouter(); // Použitie Vue Router composable

    // Counter Store
    const counterStore = useCounterStore();

    // Cart Store
    const cartStore = useCartStore();

    // Lokálne reaktívne premenné
    const showProducts = ref(false);
    const topProducts = ref([]);

    // Metódy
    const loadTopProducts = () => {
      topProducts.value = productsData.products.filter(
        (product) => product.slug === "top-products"
      );
      showProducts.value = true;
    };

    const goToArticles = () => {
      router.push("/articles"); // Použitie routera na navigáciu
    };

    return {
      count: counterStore.count,
      doubleCount: counterStore.doubleCount,
      tripleCount: counterStore.tripleCount,
      increment: counterStore.increment,
      decrement: counterStore.decrement,
      reset: counterStore.reset,

      items: cartStore.items,
      totalItems: computed(() => cartStore.totalItems),
      totalAmount: computed(() => cartStore.totalAmount),
      addToCart: cartStore.addToCart,
      removeFromCart: cartStore.removeFromCart,
      clearCart: cartStore.clearCart,

      showProducts,
      topProducts,
      loadTopProducts,
      goToArticles,
    };
  },
};
</script>

<template>
  <div class="home">
    <header class="home-header">
      <h1>Welcome to ElectroShop</h1>
      <p>Your one-stop shop for the latest electronics and news.</p>
    </header>

    <section class="features">
      <div class="feature-box" @click="goToArticles">
        <h2>Latest News</h2>
        <p>Stay updated with the latest trends in electronics.</p>
      </div>
      <div class="feature-box" @click="loadTopProducts">
        <h2>Top Products</h2>
        <p>Browse our collection of top-rated gadgets and devices.</p>
      </div>
      <div class="feature-box">
        <h2>Special Offers</h2>
        <p>Don't miss out on exclusive deals and discounts.</p>
      </div>
    </section>

    <!-- Dynamicky zobrazené produkty -->
    <TopProducts v-if="showProducts" :products="topProducts" />
  </div>
</template>

<style scoped>
.home-header {
  text-align: center;
  background-color: #007bff;
  color: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.features {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.feature-box {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  width: 250px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.feature-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.feature-box h2 {
  color: #007bff;
  margin-bottom: 10px;
}

.feature-box p {
  color: #555;
}
</style>
