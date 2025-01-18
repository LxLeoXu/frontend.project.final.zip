<template>
    <div class="component-selector">
      <h3>{{ title }}</h3>
      <div class="component-list">
        <div
          v-for="component in components"
          :key="component.id"
          class="component-card"
          :class="{ 'out-of-stock': component.stock === 0 }"
        >
          <img :src="component.image" :alt="component.name" class="component-image" />
          <h4>{{ component.name }}</h4>
          <p>Cena: {{ component.price }} €</p>
          <p v-if="component.stock > 0">Sklad: {{ component.stock }}</p>
          <p v-else class="out-of-stock-text">Vypredané</p>
          <button
            @click="selectComponent(component)"
            :disabled="component.stock === 0"
            class="select-button"
          >
            Vybrať
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ComponentSelector",
    props: {
      title: String,
      components: Array,
    },
    emits: ["select"],
    methods: {
      selectComponent(component) {
        this.$emit("select", component);
      },
    },
  };
  </script>
  
  <style scoped>
  .component-selector {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    text-align: center;
  }
  .component-selector h3 {
    color: #007bff;
    margin-bottom: 20px;
  }
  .component-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }
  .component-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 200px;
    text-align: center;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .component-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
  .component-image {
    width: 100%;
    height: auto;
    margin-bottom: 10px;
    border-radius: 8px;
  }
  .out-of-stock {
    opacity: 0.6;
  }
  .out-of-stock-text {
    color: red;
    font-weight: bold;
  }
  .select-button {
    background: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s;
  }
  .select-button:hover {
    background: #0056b3;
  }
  .select-button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  </style>
  