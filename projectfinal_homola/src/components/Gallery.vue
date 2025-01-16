
<template>
  <div class="gallery-container">
    <v-carousel v-if="!expanded" show-arrows-on-hover>
      <v-carousel-item
        v-for="(image, index) in images"
        :key="index"
        :src="image.src"
        :alt="image.alt"
        @click="expandGallery"
      />
    </v-carousel>
    
    <div v-else class="expanded-gallery">
      <div v-for="(image, index) in images" :key="index" class="thumbnail">
        <img :src="image.src" :alt="image.alt" />
      </div>
      <v-btn @click="collapseGallery" class="collapse-btn">Close</v-btn>
    </div>
  </div>
</template>

<script>
import imagesData from '@/data/data.json'; // Assuming data.json contains the images array

export default {
  name: 'Gallery',
  data() {
    return {
      images: imagesData.images || [],
      expanded: false,
    };
  },
  methods: {
    expandGallery() {
      this.expanded = true;
    },
    collapseGallery() {
      this.expanded = false;
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
  width: 100px;
  height: 100px;
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
</style>
