<script>
import TopProducts from "@/components/TopProducts.vue";
import productsData from "@/data/data.json";
import { useCounterStore } from '@/stores/counter';
import { useCartStore } from '@/stores/cart';

export default {
  name: "HomeView",
  components: { TopProducts },
  data() {
    return {
      showProducts: false,
      topProducts: [],
    };
  },
  setup() {
    const cartStore = useCartStore();

    return {
      items: cartStore.items,
      totalItems: cartStore.totalItems,
      totalAmount: cartStore.totalAmount,
      addToCart: cartStore.addToCart,
      removeFromCart: cartStore.removeFromCart,
      clearCart: cartStore.clearCart,
    };
  },
  
  setup() {
    const counterStore = useCounterStore();

    return {
      count: counterStore.count,
      doubleCount: counterStore.doubleCount,
      tripleCount: counterStore.tripleCount,
      increment: counterStore.increment,
      decrement: counterStore.decrement,
      reset: counterStore.reset,
    };
  },
  methods: {
    goToArticles() {
      this.$router.push("/articles");
    },
    loadTopProducts() {
      // Načítanie produktov na základe slugu
      this.topProducts = productsData.products.filter(
        (product) => product.slug === "top-products"
      );
      this.showProducts = true;
    },
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
