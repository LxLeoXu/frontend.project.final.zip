<template>
    <div class="articles-container">
      <h1>Articles</h1>
      <div class="buttons-container">
        <button
          v-for="article in articles"
          :key="article.id"
          class="article-button"
          @click="toggleArticle(article.id)"
        >
          {{ article.title }}
        </button>
      </div>
  
      <div v-if="selectedArticle" class="article-details">
        <img :src="selectedArticle.image" :alt="selectedArticle.title" class="article-image" />
        <h2>{{ selectedArticle.title }}</h2>
        <p>{{ selectedArticle.content }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import articles from "@/data/articles.json";
  
  export default {
    name: "ArticlesView",
    data() {
      return {
        articles,
        selectedArticle: null,
      };
    },
    methods: {
      toggleArticle(articleId) {
        if (this.selectedArticle && this.selectedArticle.id === articleId) {
          this.selectedArticle = null;
        } else {
          this.selectedArticle = this.articles.find((article) => article.id === articleId);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .articles-container {
    text-align: center;
    padding: 20px;
  }
  
  .buttons-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
  }
  
  .article-button {
    background: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s;
  }
  
  .article-button:hover {
    background: #0056b3;
  }
  
  .article-details {
    margin-top: 30px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
    background: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .article-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 10px;
  }
  
  h2 {
    font-size: 1.5rem;
    margin: 10px 0;
  }
  
  p {
    font-size: 1rem;
    color: #555;
  }
  </style>
  