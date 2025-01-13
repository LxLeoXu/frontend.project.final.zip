<template>
    <section v-if="products.length" class="top-products">
      <h2>Najčastejšie kupované produkty</h2>
      <div class="product-grid">
        <div v-for="product in products" :key="product.slug" class="product-card">
          <img :src="product.image" :alt="product.name" />
          <h3>{{ product.name }}</h3>
          <p>{{ product.price }} €</p>
          <button @click="addToCart(product)">Pridať do košíka</button>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: "TopProducts",
    props: {
      products: {
        type: Array,
        required: true,
      },
    },
    methods: {
      addToCart(product) {
        alert(`${product.name} bol pridaný do košíka.`);
      },
    },
  };
  </script>
  
  <style scoped>
  .top-products {
    margin-top: 20px;
  }
  
  .product-grid {
    display: flex;
    gap: 20px;
    justify-content: center;
  }
  
  .product-card {
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    width: 250px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .product-card img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    margin-top: 10px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  