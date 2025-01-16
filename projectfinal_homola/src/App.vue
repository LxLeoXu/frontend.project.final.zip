
<script setup>
import { ref } from 'vue';
import { useDarkModeStore } from '@/stores/darkMode';
import { useRouter, useRoute } from 'vue-router';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Gallery from './components/Gallery.vue'; // Import the Gallery component

const darkModeStore = useDarkModeStore();
const router = useRouter();
const route = useRoute();

const goToSettings = () => {
  router.push('/settings');
};
</script>

<template>
  <v-app :class="{ 'dark-mode': darkModeStore.isDarkMode }">
    <Header />

    <!-- Ikona pre personalizované nastavenie -->
    <div
      v-if="route.name !== 'shop'"
      class="settings-icon"
      @click="goToSettings"
    >
      <v-icon>mdi-cog</v-icon>
    </div>

    <!-- Prepínanie Dark Mode -->
    <div class="dark-mode-toggle">
      <v-btn @click="darkModeStore.toggleDarkMode">
        <v-icon>{{ darkModeStore.isDarkMode ? 'mdi-moon-waxing-crescent' : 'mdi-white-balance-sunny' }}</v-icon>
        <span>{{ darkModeStore.isDarkMode ? 'Dark Mode' : 'Light Mode' }}</span>
      </v-btn>
    </div>

    <v-main>
      <RouterView />
    </v-main>
    <Gallery />
    <Footer />
  </v-app>
</template>

<style scoped>
.settings-icon {
  position: fixed;
  top: 20px;
  right: 20px;
  cursor: pointer;
  z-index: 1000;
}

.dark-mode-toggle {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 10px;
}

.dark-mode {
  background-color: #121212;
  color: #ffffff;
}

.light-mode {
  background-color: #ffffff;
  color: #000000;
}
</style>
