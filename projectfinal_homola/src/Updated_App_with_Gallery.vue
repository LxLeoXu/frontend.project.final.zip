
<script setup>
import { ref } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Gallery from './components/Gallery.vue'; // Import the Gallery component
</script>

<template>
  <v-app>
    <Header />

    <!-- Main content -->
    <v-main>
      <div class="boxes-section">
        <!-- Example of three boxes -->
        <div class="box" v-for="box in 3" :key="box">Box {{ box }}</div>
      </div>

      <!-- Gallery Section -->
      <Gallery />
    </v-main>

    <Footer />
  </v-app>
</template>

<style scoped>
.boxes-section {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
}

.box {
  width: 30%;
  height: 150px;
  background-color: lightblue;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  border-radius: 8px;
}

</style>
