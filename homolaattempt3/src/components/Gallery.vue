<template>
  <div class="gallery-container">
    <!-- Horizontálne posúvanie obrázkov s tlačidlami -->
    <div class="scroll-wrapper">
      <button class="scroll-btn left" @click="scrollLeft">&#8249;</button>
      <div class="scroll-container" ref="scrollContainer">
        <div
          v-for="(product, index) in products"
          :key="index"
          class="image-item"
        >
          <img
            v-if="product.image"
            :src="product.image"
            :alt="product.name || 'Product Image'"
            @click="openLightbox(index)"
          />
        </div>
      </div>
      <button class="scroll-btn right" @click="scrollRight">&#8250;</button>
    </div>

    <!-- Lightbox pre zväčšený obrázok s tlačidlami na navigáciu -->
    <div v-if="lightbox" class="lightbox">
      <button class="lightbox-btn left" @click="previousImage">&#8249;</button>
      <img :src="currentImage" alt="Expanded Image" class="lightbox-image" />
      <button class="lightbox-btn right" @click="nextImage">&#8250;</button>
      <button class="close-btn" @click="closeLightbox">&times;</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Gallery",
  data() {
    return {
      products: [],
      lightbox: false,
      currentImage: "",
      currentIndex: 0,
    };
  },
  created() {
    this.loadProducts();
  },
  methods: {
    async loadProducts() {
      try {
        const response = await fetch("/data/data2.json");
        const jsonData = await response.json();
        // Ensure data is valid and handle missing images
        this.products = jsonData.categories.flatMap((category) =>
          category.products.map((product) => ({
            ...product,
            image: product.image
              ? product.image.startsWith("/images")
                ? product.image
                : `/images${product.image}`
              : "/images/default.jpg", // Fallback image
          }))
        );
      } catch (error) {
        console.error("Error loading data:", error);
      }
    },
    openLightbox(index) {
      this.lightbox = true;
      this.currentIndex = index;
      this.currentImage = this.products[index].image;
    },
    closeLightbox() {
      this.lightbox = false;
      this.currentImage = "";
    },
    previousImage() {
      if (this.currentIndex > 0) {
        this.currentIndex -= 1;
      } else {
        this.currentIndex = this.products.length - 1; // Loop to last image
      }
      this.currentImage = this.products[this.currentIndex].image;
    },
    nextImage() {
      if (this.currentIndex < this.products.length - 1) {
        this.currentIndex += 1;
      } else {
        this.currentIndex = 0; // Loop to first image
      }
      this.currentImage = this.products[this.currentIndex].image;
    },
    scrollLeft() {
      const container = this.$refs.scrollContainer;
      container.scrollLeft -= 200;
    },
    scrollRight() {
      const container = this.$refs.scrollContainer;
      container.scrollLeft += 200;
    },
  },
};
</script>

<style scoped>
.gallery-container {
  margin: 20px auto;
  max-width: 90%;
}
.scroll-wrapper {
  display: flex;
  align-items: center;
  position: relative;
}
.scroll-container {
  display: flex;
  overflow-x: auto;
  gap: 15px;
  padding: 10px;
  scroll-behavior: smooth;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  flex-grow: 1;
}
.image-item {
  flex: 0 0 auto;
  width: 200px;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s;
}
.image-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.image-item:hover {
  transform: scale(1.05);
}
.scroll-btn {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  z-index: 10;
}
.scroll-btn.left {
  left: 10px;
}
.scroll-btn.right {
  right: 10px;
}
.scroll-btn:hover {
  background-color: rgba(0, 0, 0, 0.8);
}
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.lightbox-image {
  max-width: 90%;
  max-height: 90%;
  border-radius: 10px;
}
.lightbox-btn {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  z-index: 10;
}
.lightbox-btn.left {
  left: 20px;
}
.lightbox-btn.right {
  right: 20px;
}
.lightbox-btn:hover {
  background-color: rgba(0, 0, 0, 0.8);
}
.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 30px;
  color: white;
  cursor: pointer;
}
.close-btn:hover {
  color: #f00;
}
</style>
