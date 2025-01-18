<template>
    <div>
      <button @click="showContent">
        {{ article.title }}
      </button>
      <div v-if="showingContent">
        <h2>{{ article.title }}</h2>
        <p>{{ article.content }}</p>
        <button @click="hideContent">Back to list</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ArticleItem",
    props: {
      article: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        showingContent: false,
      };
    },
    methods: {
      showContent() {
        this.showingContent = true;
      },
      hideContent() {
        this.showingContent = false;
      },
    },
  };
  </script>
  
  <style scoped>
  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 10px;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  