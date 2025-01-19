<template>
  <div class="articles-container">
    <h1>Blog</h1>

    <!-- Filter Section -->
    <div class="filter-container">
      <label for="categoryFilter">Filter by Category:</label>
      <select id="categoryFilter" v-model="selectedCategory">
        <option value="">All</option>
        <option value="Tech">Tech</option>
        <option value="Finance">Finance</option>
        <option value="Lifestyle">Lifestyle</option>
      </select>
    </div>

    <!-- Article Buttons -->
    <div class="buttons-container">
      <button
        v-for="article in filteredArticles"
        :key="article.id"
        class="article-button"
        @click="toggleArticle(article.id)"
      >
        {{ article.title }}
      </button>
    </div>

    <!-- Article Details -->
    <transition name="fade">
      <div v-if="selectedArticle" class="article-details">
        <img
          :src="selectedArticle.image"
          :alt="selectedArticle.title"
          class="article-image"
        />
        <h2>{{ selectedArticle.title }}</h2>
        <p class="article-content">{{ selectedArticle.content }}</p>
        <p class="article-views">Views: {{ selectedArticle.views || 0 }}</p>
        <div class="rating-container">
          <p>Rating: {{ selectedArticle.rating || 0 }} ⭐</p>
          <label for="ratingSlider">Set Rating (0 - 5):</label>
          <input
            id="ratingSlider"
            type="range"
            min="0"
            max="5"
            step="0.1"
            v-model.number="ratingInput"
          />
          <span>{{ ratingInput }}</span>
          <button @click="rateArticleWithSlider" class="rate-button">
            Confirm Rating
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import blog from "@/data/blog.json";

export default {
  name: "BlogView",
  data() {
    return {
      articles: blog,
      selectedArticle: null,
      selectedCategory: "",
      ratingInput: 0,
    };
  },
  computed: {
    filteredArticles() {
      if (this.selectedCategory) {
        return this.articles.filter(
          (article) => article.category === this.selectedCategory
        );
      }
      return this.articles;
    },
  },
  methods: {
    toggleArticle(articleId) {
      const article = this.articles.find((a) => a.id === articleId);
      if (this.selectedArticle && this.selectedArticle.id === articleId) {
        this.selectedArticle = null;
      } else {
        this.selectedArticle = article;
        this.ratingInput = article.rating || 0;
        if (!article.views) {
          article.views = 0;
        }
        article.views++;
      }
    },
    rateArticleWithSlider() {
      if (this.selectedArticle) {
        this.selectedArticle.rating = parseFloat(
          Number(this.ratingInput).toFixed(1)
        );
      }
    },
  },
};
</script>

<style scoped>
/* General Container */
.articles-container {
  font-family: "Roboto", sans-serif;
  padding: 20px;
  text-align: center;
  max-width: 1200px;
  margin: auto;
}

/* Header */
h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #333;
}

/* Filter Section */
.filter-container {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

select {
  padding: 10px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
}

/* Article Buttons */
.buttons-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin: 20px 0;
}

.article-button {
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  border: none;
  padding: 15px 20px;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.article-button:hover {
  background: linear-gradient(135deg, #0056b3, #003e7e);
  transform: scale(1.05);
}

/* Article Details */
.article-details {
  margin-top: 20px;
  padding: 30px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: left;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.article-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
}

.article-content {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #555;
}

.article-views {
  font-size: 1rem;
  margin-top: 10px;
  color: #777;
}

/* Rating Section */
.rating-container {
  margin-top: 20px;
}

.rate-button {
  margin-top: 10px;
  background: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;
}

.rate-button:hover {
  background: #218838;
}

/* Transition Effects */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
