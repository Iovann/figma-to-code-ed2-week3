// Fonction pour récupérer les catégories
export const fetchCategories = async (setCategories, setLoading, setError) => {
  setLoading(true);
  setError(""); // Réinitialiser l'erreur avant chaque chargement
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/categories/list"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setCategories(data);
  } catch (error) {
    setError("Erreur lors de la récupération des catégories.");
    console.error("Erreur lors de la récupération des catégories :", error);
  } finally {
    setLoading(false);
  }
};

// Fonction pour récupérer les données crypto
export const fetchCryptoData = async (setCryptos, setLoading, setError) => {
  setLoading(true);
  setError("");
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setCryptos(data);
  } catch (error) {
    setError("Erreur lors de la récupération des données crypto.");
    console.error("Erreur lors de la récupération des données crypto :", error);
  } finally {
    setLoading(false);
  }
};

// Fonction pour récupérer les détails d'une crypto
export const handleCryptoClick = async (
  coinId,
  setSelectedCrypto,
  setIsModalOpen
) => {
  try {
    const [overviewResponse, chartDataResponse] = await Promise.all([
      fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}?x_cg_demo_api_key=${
          import.meta.env.VITE_NEWS_API_KEY
        }`
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

    setSelectedCrypto({
      ...overviewData,
      chartData: chartData.prices,
    });
    setIsModalOpen(true);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données détaillées :",
      error
    );
  }
};
