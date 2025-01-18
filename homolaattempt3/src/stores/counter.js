import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);

  // Výpočty
  const doubleCount = computed(() => count.value * 2);
  const tripleCount = computed(() => count.value * 3);

  // Akcie
  function increment() {
    count.value++;
  }

  function decrement() {
    count.value--;
  }

  function reset() {
    count.value = 0;
  }

  return { count, doubleCount, tripleCount, increment, decrement, reset };
});
