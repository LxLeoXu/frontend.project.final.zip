<script>
import TopProducts from "@/components/TopProducts.vue";
import Gallery from "@/components/Gallery.vue";
import productsData from "@/data/data.json";
import { useCounterStore } from "@/stores/counter";
import { useCartStore } from "@/stores/cart";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "HomeView",
  components: { TopProducts, Gallery },
  setup() {
    const router = useRouter();

    const counterStore = useCounterStore();
    const cartStore = useCartStore();

    const showProducts = ref(false);
    const topProducts = ref([]);
    const galleryImages = ref([]);

    const loadTopProducts = () => {
      try {
        const filteredProducts = productsData.products.filter(
          (product) => product.slug === "top-products"
        );
        if (filteredProducts.length > 0) {
          topProducts.value = filteredProducts.map(product => ({
            ...product,
            image: product.image.replace("@/", "/public/"),
          }));
          showProducts.value = true;
        } else {
          console.warn("No top products found.");
        }
      } catch (error) {
        console.error("Failed to load top products:", error);
      }
    };

    const goToBlog = () => {
      router.push("/blog");
    };

    const goToShop = () => {
      router.push("/shop");
    };
    const goTopsrepair = () => {
      router.push("/pcbuild")
    }

    const loadGalleryImages = async () => {
      try {
        const response = await fetch("/data/data2.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const shopData = await response.json();
        galleryImages.value = shopData.categories.flatMap(category =>
          category.products.map(product => product.image.startsWith("/images")
            ? product.image
            : `/images/${product.image.split("/").pop()}`
          )
        );
      } catch (error) {
        console.error("Failed to load gallery images:", error);
      }
    };

    onMounted(() => {
      loadGalleryImages();
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
      goToBlog,
      goToShop,
      goTopsrepair,
      galleryImages,
      loadGalleryImages,
    };
  },
};
</script>

<template>
  <div class="home">
    <!-- Hlavný banner -->
    <header class="home-header">
      <h1>Welcome to <span class="brand">ElectroShop</span></h1>
      <p>Your one-stop shop for the latest electronics and news.</p>
    </header>

    <!-- Sekcia s funkciami -->
    <section class="features">
      <div class="feature-box" @click="goToBlog">
        <v-icon>mdi-newspaper</v-icon>
        <h2>Latest News</h2>
        <p>Stay updated with the latest trends in electronics.</p>
      </div>
      <div class="feature-box" @click="loadTopProducts">
        <v-icon>mdi-star-outline</v-icon>
        <h2>Top Products</h2>
        <p>Browse our collection of top-rated gadgets and devices.</p>
      </div>
      <div class="feature-box" @click="goToShop">
        <v-icon>mdi-cart-outline</v-icon>
        <h2>Shop</h2>
        <p>Don't miss out on exclusive deals and discounts.</p>
      </div>
      <div class="feature-box" @click="goTopsrepair">
        <v-icon>mdi-cart-outline</v-icon>
        <h2> build your own pc here</h2>
        <p>pick your parts what you want to have in your own pc here or you can repair your pc here</p>
      </div>
    </section>

    <!-- Dynamicky zobrazené produkty -->
    <TopProducts v-if="showProducts" :products="topProducts" />

    <!-- Galéria obrázkov -->
    <section class="gallery-section">
      <h2>Explore Our Collection</h2>
      <Gallery />
    </section>
  </div>
</template>


<style scoped>
/* Hlavná stránka */
.home {
  font-family: "Roboto", sans-serif;
  color: #333;
}

/* Hlavný banner */
.home-header {
  text-align: center;
  background: linear-gradient(90deg, #007bff, #6610f2);
  color: white;
  padding: 40px 20px;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.home-header h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.home-header .brand {
  color: #ffdd57;
}

/* Sekcia funkcií */
.features {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 40px;
}

.feature-box {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  width: 300px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.feature-box h2 {
  color: #007bff;
  margin: 15px 0 10px;
}

.feature-box p {
  color: #555;
}

.feature-box v-icon {
  font-size: 2rem;
  color: #007bff;
}

/* Sekcia galérie */
.gallery-section {
  background: #f9f9f9;
  padding: 30px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-bottom: 40px;
}

.gallery-section h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
}
</style>
