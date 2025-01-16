<script>
import TopProducts from "@/components/TopProducts.vue";
import Gallery from "@/components/Gallery.vue";
import productsData from "@/data/data.json";
import { useCounterStore } from "@/stores/counter";
import { useCartStore } from "@/stores/cart";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router"; // Import Vue Router composable

export default {
  name: "HomeView",
  components: { TopProducts, Gallery },
  setup() {
    // Router
    const router = useRouter();

    // Counter Store
    const counterStore = useCounterStore();

    // Cart Store
    const cartStore = useCartStore();

    // Lokálne reaktívne premenné
    const showProducts = ref(false);
    const topProducts = ref([]);
    const galleryImages = ref([]);

    // Metódy
    const loadTopProducts = () => {
      const filteredProducts = productsData.products.filter(
        (product) => product.slug === "top-products"
      );
      if (filteredProducts.length > 0) {
        // Update image paths for compatibility
        topProducts.value = filteredProducts.map(product => ({
          ...product,
          image: product.image.replace('@/', '/public/')
        }));
        showProducts.value = true;
      } else {
        console.error("No top products found.");
      }
    };

    const goToArticles = () => {
      router.push("/articles"); // Použitie routera na navigáciu
    };

    const goToShop = () => {
      router.push("/shop"); // Malé písmeno pre správnu URL
    };

    const loadGalleryImages = async () => {
      try {
        const response = await fetch("/data/data2.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const shopData = await response.json();
        galleryImages.value = shopData.categories.flatMap(category =>
          category.products.map(product => "/images/" + product.image.split("/").pop())
        );
      } catch (error) {
        console.error("Failed to load gallery images:", error);
      }
    };

    onMounted(() => {
      // Optional initialization if needed
    });

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
      goToShop,
      galleryImages,
      loadGalleryImages
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
      <div class="feature-box" @click="goToShop">
        <h2>Shop</h2>
        <p>Don't miss out on exclusive deals and discounts.</p>
      </div>
      <div class="feature-box" @click="loadGalleryImages">
        <h2>Gallery</h2>
        <p>Click to load our image gallery.</p>
      </div>
    </section>

    <!-- Dynamicky zobrazené produkty -->
    <TopProducts v-if="showProducts" :products="topProducts" />

    <!-- Gallery component -->
    <section class="gallery-section" v-if="galleryImages.length > 0">
      <h2>Image Gallery</h2>
      <div class="gallery">
        <img v-for="(image, index) in galleryImages" :key="index" :src="image" alt="Gallery Image" class="gallery-image" />
      </div>
    </section>
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

.gallery-section {
  margin-top: 40px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.gallery {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.gallery-image {
  width: 200px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.gallery-image:hover {
  transform: scale(1.05);
}
</style>
