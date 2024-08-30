// src/cryptoFunctions.js

export const fetchCategories = async () => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/categories/list"
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const fetchCryptoData = async () => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true"
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const handleSearchChange = (event, setSearchTerm) => {
  setSearchTerm(event.target.value);
};

export const handleCategoryChange = (
  event,
  setSelectedCategory,
  setCurrentPage
) => {
  setSelectedCategory(event.target.value);
  setCurrentPage(1);
};

export const toggleFavorite = (id, setFavorites) => {
  setFavorites((prevFavorites) =>
    prevFavorites.includes(id)
      ? prevFavorites.filter((fav) => fav !== id)
      : [...prevFavorites, id]
  );
};

export const handlePageChange = (newPage, setCurrentPage, totalPages) => {
  if (newPage >= 1 && newPage <= totalPages) {
    setCurrentPage(newPage);
  }
};

export const handleRowsChange = (event, setRowsPerPage, setCurrentPage) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setCurrentPage(1);
};
