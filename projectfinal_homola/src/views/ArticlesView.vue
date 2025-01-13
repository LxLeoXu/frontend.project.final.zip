<template>
    <div class="articles">
      <h1>Articles</h1>
      <div v-if="loading">Loading articles...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <ul>
          <li v-for="article in articles" :key="article.id">
            <ArticleItem :article="article" />
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import ArticleItem from "@/components/ArticleItem.vue";
  
  export default {
    name: "ArticlesView",
    components: {
      ArticleItem,
    },
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
  
  <style scoped>
  .articles {
    padding: 20px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 10px;
  }
  </style>
  