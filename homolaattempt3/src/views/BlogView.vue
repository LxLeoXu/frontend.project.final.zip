<template>
  <div class="articles-container">
    <h1>Blog</h1>
    
    <!-- Filtrovanie podľa kategórií -->
    <div class="filter-container">
      <label for="categoryFilter">Filtrovať podľa kategórie:</label>
      <select id="categoryFilter" v-model="selectedCategory">
        <option value="">Všetko</option>
        <option value="Tech">Tech</option>
        <option value="Finance">Finance</option>
        <option value="Lifestyle">Lifestyle</option>
      </select>
    </div>
    
    <div class="buttons-container">
      <!-- Dynamicky generované tlačidlá pre články -->
      <button
        v-for="article in filteredArticles"
        :key="article.id"
        class="article-button"
        @click="toggleArticle(article.id)"
      >
        {{ article.title }}
      </button>
    </div>

    <!-- Zobrazenie detailov vybraného článku -->
    <transition name="fade">
      <div v-if="selectedArticle" class="article-details">
        <img
          :src="selectedArticle.image"
          :alt="selectedArticle.title"
          class="article-image"
        />
        <h2>{{ selectedArticle.title }}</h2>
        <p>{{ selectedArticle.content }}</p>
        <p>Počet návštev: {{ selectedArticle.views || 0 }}</p>
        <div>
          <p>Hodnotenie: {{ selectedArticle.rating || 0 }} ⭐</p>
          <!-- Slider na hodnotenie -->
          <label for="ratingSlider">Nastav hodnotenie (0 - 5):</label>
          <input
            id="ratingSlider"
            type="range"
            min="0"
            max="5"
            step="0.1"
            v-model.number="ratingInput"
          />
          <span>{{ ratingInput }}</span>
          <button @click="rateArticleWithSlider">Potvrdiť hodnotenie</button>
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
      articles: blog, // Načítanie článkov zo súboru blog.json
      selectedArticle: null,
      selectedCategory: "", // Vybraná kategória pre filtrovanie
      ratingInput: 0, // Lokálne udržiavaná hodnota pre slider
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
        this.selectedArticle = null; // Skryť aktuálny článok
      } else {
        this.selectedArticle = article;
        this.ratingInput = article.rating || 0; // Nastaviť slider na aktuálne hodnotenie
        if (!article.views) {
          article.views = 0;
        }
        article.views++; // Zvýšiť počet návštev
      }
    },
    rateArticleWithSlider() {
      if (this.selectedArticle) {
        this.selectedArticle.rating = parseFloat(
          Number(this.ratingInput).toFixed(1)
        ); // Uložiť hodnotenie ako číslo s 1 desatinným miestom
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

.filter-container {
  margin-bottom: 20px;
}

.filter-container label {
  margin-right: 10px;
}

.buttons-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
}

.article-button {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}

.article-button:hover {
  background: #0056b3;
}

.article-details {
  margin-top: 20px;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

h2 {
  font-size: 1.5rem;
  margin: 10px 0;
}

p {
  font-size: 1rem;
  color: #555;
}

button {
  cursor: pointer;
}
</style>
