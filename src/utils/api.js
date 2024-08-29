// Base URL pour l'API CoinGecko
const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3";

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
