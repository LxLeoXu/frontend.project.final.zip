import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDarkModeStore = defineStore('darkMode', () => {
  const isDarkMode = ref(false); // Stav pre Dark Mode

  // Funkcia na prepínanie režimu
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    updateDarkModeClass();
    saveToLocalStorage();
  };

  // Funkcia na aktualizáciu triedy
  const updateDarkModeClass = () => {
    if (isDarkMode.value) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  // Načítanie z `localStorage` pri inicializácii
  const loadFromLocalStorage = () => {
    const savedMode = localStorage.getItem('darkMode');
    isDarkMode.value = savedMode === 'true';
    updateDarkModeClass();
  };

  // Uloženie do `localStorage`
  const saveToLocalStorage = () => {
    localStorage.setItem('darkMode', isDarkMode.value);
  };

  // Načítanie pri inicializácii
  loadFromLocalStorage();

  return {
    isDarkMode,
    toggleDarkMode,
  };
});
