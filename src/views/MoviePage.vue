<template>
  <div class="container">
    <h1>🎬 Film Öneri Sitesi</h1>

    <!-- Arama Kutusu ve Kategori Butonları -->
    <div class="search-section">
      <input
        v-model="searchQuery"
        placeholder="Film arayın..."
        class="search-input"
      />
      <button @click="searchMovies" class="search-button">Ara</button>
    </div>

    <div class="category-section">
      <button @click="fetchCategory('action')" class="category-button">
        Aksiyon
      </button>
      <button @click="fetchCategory('comedy')" class="category-button">
        Komedi
      </button>
      <button @click="fetchCategory('drama')" class="category-button">
        Dram
      </button>
      <button @click="fetchCategory('horror')" class="category-button">
        Korku
      </button>
      <button @click="fetchCategory('sci-fi')" class="category-button">
        Bilim Kurgu
      </button>
    </div>

    <!-- Yükleniyor ve Hata Mesajları -->
    <div v-if="loading" class="loading">🎬 Yükleniyor...</div>
    <div v-if="error" class="error">⚠️ {{ error }}</div>

    <!-- Film Listesi ve Detay Görünümü İçin Geçiş Animasyonu -->
    <transition name="fade" mode="out-in">
      <div
        v-if="!selectedMovie && movies && movies.length"
        class="movie-list"
        key="movie-list"
      >
        <div
          v-for="movie in movies"
          :key="movie.imdbID"
          class="movie-card"
          @click="showMovieDetail(movie.imdbID)"
        >
          <img
            :src="movie.Poster"
            alt="Poster"
            loading="lazy"
            class="movie-poster"
            v-if="movie.Poster !== 'N/A'"
          />
          <h3 class="movie-title">{{ movie.Title }}</h3>
          <p class="movie-year">{{ movie.Year }}</p>
        </div>
      </div>

      <div v-else-if="selectedMovie" class="movie-detail" key="movie-detail">
        <button @click="closeMovieDetail" class="back-button">Geri Dön</button>
        <h2>{{ selectedMovie.Title }} ({{ selectedMovie.Year }})</h2>
        <img
          :src="selectedMovie.Poster"
          alt="Poster"
          loading="lazy"
          class="detail-poster"
          v-if="selectedMovie.Poster !== 'N/A'"
        />
        <p><strong>IMDb Puanı:</strong> {{ selectedMovie.imdbRating }}</p>
        <p><strong>Tür:</strong> {{ selectedMovie.Genre }}</p>
        <p><strong>Yönetmen:</strong> {{ selectedMovie.Director }}</p>
        <p><strong>Oyuncular:</strong> {{ selectedMovie.Actors }}</p>
        <p><strong>Açıklama:</strong> {{ selectedMovie.Plot }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
import { fetchMovies, fetchMovieDetails } from "../services/api";

export default {
  data() {
    return {
      searchQuery: "",
      movies: null,
      loading: false,
      error: null,
      selectedMovie: null,
    };
  },
  methods: {
    async searchMovies() {
      this.loading = true;
      this.error = null;
      this.selectedMovie = null;

      try {
        this.movies = await fetchMovies(this.searchQuery);
      } catch (err) {
        this.error = "Bir hata oluştu. Lütfen tekrar deneyin.";
      } finally {
        this.loading = false;
      }
    },
    async fetchCategory(category) {
      this.loading = true;
      this.error = null;
      this.selectedMovie = null;

      try {
        this.movies = await fetchMovies(category);
      } catch (err) {
        this.error = "Bir hata oluştu. Lütfen tekrar deneyin.";
      } finally {
        this.loading = false;
      }
    },
    async showMovieDetail(movieId) {
      this.loading = true;
      this.error = null;

      try {
        this.selectedMovie = await fetchMovieDetails(movieId);
      } catch (err) {
        this.error = "Bir hata oluştu. Lütfen tekrar deneyin.";
      } finally {
        this.loading = false;
      }
    },
    closeMovieDetail() {
      this.selectedMovie = null;
    },
  },
};
</script>

<style scoped>
/* Arka Plan ve Genel Tasarım */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  background: url("https://images.unsplash.com/photo-1517602302552-471fe67acf66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080")
    center center/cover no-repeat fixed;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #ffffff;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.8); /* Saydam karanlık katman */
  backdrop-filter: blur(6px); /* Hafif arka plan bulanıklığı */
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8);
}

/* Başlık Stili */
h1 {
  color: #ffffff;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 0 4px 10px rgba(0, 0, 0, 0.7);
}

/* Arama ve Kategori Butonları */
.search-section {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.search-input {
  padding: 12px;
  font-size: 1.1rem;
  border-radius: 5px 0 0 5px;
  border: 2px solid #42b983;
  outline: none;
  width: 300px;
}

.search-button {
  padding: 12px 25px;
  font-size: 1.1rem;
  background-color: #42b983;
  color: white;
  border: 2px solid #42b983;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: #369b6e;
}

/* Kategori Butonları */
.category-section {
  margin: 20px 0;
}

.category-button {
  margin: 0 10px;
  padding: 10px 15px;
  font-size: 1rem;
  background-color: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, transform 0.3s;
}

.category-button:hover {
  background-color: #42b983;
  color: #ffffff;
  transform: scale(1.05);
}

/* Film Kartları */
.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
}

.movie-card {
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 10px;
  width: 200px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  color: #ffffff;
}

.movie-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.6);
}

.movie-poster {
  width: 100%;
  height: 300px;
  border-radius: 5px;
}

.movie-title {
  font-size: 1.2rem;
  color: #ffffff;
  margin-top: 10px;
  font-weight: 600;
}

.movie-year {
  color: #cccccc;
  font-size: 1rem;
}
</style>
