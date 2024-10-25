// src/services/api.js

const API_KEY = "a360da12"; // OMDb API anahtarınızı doğrudan burada tanımlayın
const BASE_URL = "http://www.omdbapi.com/";

// Filmleri Arama Fonksiyonu
export async function fetchMovies(searchQuery) {
  const url = `${BASE_URL}?apikey=${API_KEY}&s=${searchQuery}&type=movie`;
  const response = await fetch(url);
  const data = await response.json();
  return data.Search; // Filmler listesi döner
}

// Film Detaylarını Getirme Fonksiyonu
export async function fetchMovieDetails(movieId) {
  const url = `${BASE_URL}?apikey=${API_KEY}&i=${movieId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data; // Tek bir film detayı döner
}
