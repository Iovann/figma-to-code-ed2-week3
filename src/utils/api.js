// Base URL pour l'API CoinGecko
const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3";

// src/api.js
const API_KEY = import.meta.env.REACT_APP_NEWS_API_KEY;

export const fetchNews = async () => {
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=tesla&from=2024-07-29&sortBy=publishedAt&apiKey=0c4b7db1e48a4d3baa3a5aeebdecaba4`
  );
  const data = await response.json();
  return data.articles;
};

// Fonction pour récupérer les données crypto
export const fetchCryptoData = async (
  currency = "usd",
  perPage = 10,
  page = 1
) => {
  const url = new URL(`${COINGECKO_BASE_URL}/coins/markets`);
  url.searchParams.append("vs_currency", currency);
  url.searchParams.append("order", "market_cap_desc");
  url.searchParams.append("per_page", perPage);
  url.searchParams.append("page", page);
  url.searchParams.append("sparkline", "true");
  url.searchParams.append("price_change_percentage", "24h");

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des données crypto :", error);
    return [];
  }
};

export const fetchTrendingCryptos = async () => {
  try {
    const response = await fetch(`${COINGECKO_BASE_URL}/search/trending`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.coins || [];
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des cryptos en tendance :",
      error
    );
    return [];
  }
};

const NEWS_BASE_URL = "https://newsapi.org/v2";

*export const fetchCryptoNews = async (page = 1, pageSize = 10) => {
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
  const url = new URL(`${NEWS_BASE_URL}/everything`);
  url.searchParams.append(
    "q",
    "cryptocurrency OR crypto OR bitcoin OR ethereum"
  );
  url.searchParams.append("pageSize", pageSize);
  url.searchParams.append("page", page);
  url.searchParams.append("apiKey", API_KEY);
  url.searchParams.append("sortBy", "publishedAt");

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des actualités :", error);
    return { articles: [] };
  }
};
