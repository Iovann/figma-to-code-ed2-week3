// api.js

export const fetchCategories = async () => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/categories/list"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(
      `Erreur lors de la récupération des catégories: ${error.message}`
    );
  }
};

export const fetchCryptoData = async () => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(
      `Erreur lors de la récupération des données crypto: ${error.message}`
    );
  }
};

export const fetchCryptoDetails = async (coinId) => {
  try {
    const [overviewResponse, chartDataResponse] = await Promise.all([
      fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}?x_cg_demo_api_key=CG-rXE4JJ9wxMhDucxGz8eha4tV`
      ),
      fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=10`
      ),
    ]);

    if (!overviewResponse.ok || !chartDataResponse.ok) {
      throw new Error(
        `HTTP error! status: ${overviewResponse.status} or ${chartDataResponse.status}`
      );
    }

    const [overviewData, chartData] = await Promise.all([
      overviewResponse.json(),
      chartDataResponse.json(),
    ]);

    return {
      overviewData,
      chartData: chartData.prices,
    };
  } catch (error) {
    throw new Error(
      `Erreur lors de la récupération des données détaillées: ${error.message}`
    );
  }
};
