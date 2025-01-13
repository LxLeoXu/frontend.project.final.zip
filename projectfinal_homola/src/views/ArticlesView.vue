<template>
    <div class="articles">
      <h1>Articles</h1>
      <div v-if="loading">Loading articles...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <div v-for="article in articles" :key="article.id" class="article">
          <h2>{{ article.title }}</h2>
          <p>{{ article.content }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ArticlesView",
    data() {
      return {
        articles: [],
        loading: true,
        error: null,
      };
    },
    methods: {
      async fetchArticles() {
        try {
          const response = await fetch('/data/articles.json'); // Načítanie článkov
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          this.articles = await response.json();
        } catch (error) {
          console.error('Error loading articles:', error);
          this.error = "Error loading articles. Please try again later.";
        } finally {
          this.loading = false;
        }
      },
    },
    created() {
      this.fetchArticles();
    },
  };
  </script>
  
  <style>
  .articles {
    padding: 20px;
  }
  
  .article {
    margin-bottom: 20px;
  }
  
  .article h2 {
    margin-bottom: 10px;
    font-size: 20px;
  }
  
  .article p {
    font-size: 16px;
    color: #555;
  }
  </style>
  