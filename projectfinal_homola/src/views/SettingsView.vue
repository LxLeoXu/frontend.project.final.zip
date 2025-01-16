SettingsView.vue<script setup>
import { ref, onMounted } from "vue";

// Reactive state for dark mode
const isDarkMode = ref(false);

// Toggle dark mode
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  applyTheme();
  saveToLocalStorage();
};

// Apply theme based on `isDarkMode`
const applyTheme = () => {
  if (isDarkMode.value) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

// Save preference to localStorage
const saveToLocalStorage = () => {
  localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode.value));
};

// Load preference from localStorage
onMounted(() => {
  const savedDarkMode = localStorage.getItem("isDarkMode");
  if (savedDarkMode !== null) {
    isDarkMode.value = JSON.parse(savedDarkMode);
    applyTheme();
  }
});
</script>

<template>
  <div class="settings">
    <h1>Settings</h1>
    <div class="option">
      <label for="darkMode">Dark Mode</label>
      <input id="darkMode" type="checkbox" v-model="isDarkMode" @change="toggleDarkMode" />
    </div>
  </div>
</template>

<style scoped>
.settings {
  padding: 20px;
}

.option {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.dark {
  background-color: #121212;
  color: white;
}

body.dark {
  background-color: #121212;
  color: white;
}
</style>
