<template>
  <div class="gallery-container">
    <!-- Carousel pre obrázky -->
    <v-carousel v-if="!expanded && !lightbox" show-arrows-on-hover>
      <v-carousel-item
        v-for="(product, index) in products"
        :key="index"
        :src="product.image"
        :alt="product.name"
        @click="openLightbox(product.image)"
      />
    </v-carousel>

    <!-- Zväčšené obrázky vo forme galérie -->
    <div v-else-if="expanded" class="expanded-gallery">
      <div v-for="(product, index) in products" :key="index" class="thumbnail">
        <img :src="product.image" :alt="product.name" @click="openLightbox(product.image)" />
        <p>{{ product.name }}</p>
      </div>
      <v-btn @click="collapseGallery" class="collapse-btn">Close</v-btn>
    </div>

    <!-- Lightbox pre zväčšený obrázok -->
    <div v-if="lightbox" class="lightbox" @click="closeLightbox">
      <img :src="currentImage" alt="Expanded Image" class="lightbox-image" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Gallery',
  data() {
    return {
      products: [],
      expanded: false,
      lightbox: false,
      currentImage: '',
    };
  },
  created() {
    this.loadProducts();
  },
  methods: {
    async loadProducts() {
      try {
        const response = await fetch('/data/data2.json');
        const jsonData = await response.json();
        this.products = jsonData.categories.flatMap(category =>
          category.products.map(product => ({
            ...product,
            image: product.image.startsWith('/images')
              ? product.image
              : `/images${product.image}`,
          }))
        );
      } catch (error) {
        console.error('Error loading data:', error);
      }
    },
    expandGallery() {
      this.expanded = true;
    },
    collapseGallery() {
      this.expanded = false;
    },
    openLightbox(image) {
      this.lightbox = true;
      this.currentImage = image;
    },
    closeLightbox() {
      this.lightbox = false;
      this.currentImage = '';
    },
  },
};
</script>

<style scoped>
.gallery-container {
  margin: 20px auto;
  max-width: 80%;
}
.expanded-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}
.thumbnail {
  width: 120px;
  height: 120px;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
}
.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.collapse-btn {
  margin-top: 20px;
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
</style>
