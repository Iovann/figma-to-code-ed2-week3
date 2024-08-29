import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import CryptoModal from "./CryptoModal";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CryptoTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cryptos, setCryptos] = useState([]);

  // Nouveaux états pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Nombre initial de lignes par page

  useEffect(() => {
    // Fonction pour récupérer les catégories
    const fetchCategories = async () => {
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
        console.error("Erreur lors de la récupération des catégories :", error);
      }
    };

    // Fonction pour récupérer les données crypto
    const fetchCryptoData = async () => {
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
        console.error(
          "Erreur lors de la récupération des données crypto :",
          error
        );
      }
    };

    fetchCategories();
    fetchCryptoData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1); // Réinitialiser la page à 1 lors du changement de catégorie
  };

  const filteredCryptos = cryptos.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || crypto.category === selectedCategory)
  );

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((fav) => fav !== id)
        : [...prevFavorites, id]
    );
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { display: false },
      y: { display: false },
    },
    plugins: {
      legend: { display: false },
    },
    elements: {
      point: { radius: 0 },
      line: { borderWidth: 1 },
    },
  };

  // Pagination
  const totalCryptos = filteredCryptos.length;
  const indexOfLastCrypto = currentPage * rowsPerPage;
  const indexOfFirstCrypto = indexOfLastCrypto - rowsPerPage;
  const currentCryptos = filteredCryptos.slice(
    indexOfFirstCrypto,
    indexOfLastCrypto
  );

  const totalPages = Math.ceil(totalCryptos / rowsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleRowsChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCryptoClick = async (coinId) => {
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

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCrypto(null);
  };

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col items-center justify-between space-y-4 px-4 md:flex-row md:space-y-0">
        <input
          type="search"
          className="w-full rounded-lg border border-tokena_gray bg-white px-4 py-2 text-sm text-tokena_dark focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-tokena_dark_gray dark:bg-tokena_dark_blue_1 dark:text-tokena_light_gray md:w-64"
          placeholder="Search crypto..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select
          className="w-full rounded-lg border border-tokena_gray bg-white px-4 py-2 text-sm text-tokena_dark focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-tokena_dark_gray dark:bg-tokena_dark_blue_1 dark:text-tokena_light_gray md:w-48"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.category_id} value={category.category_id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="mt-6 flex w-full items-center justify-between rounded-t-lg border-x border-t border-tokena_gray p-2 shadow-sm dark:border-tokena_dark_gray">
        <h2 className="text-sm font-semibold text-tokena_dark dark:text-tokena_light_gray xl:text-lg">
          Market
        </h2>
        <button className="rounded-lg border border-tokena_gray p-2 font-medium text-tokena_dark shadow-sm dark:border-tokena_dark_gray dark:text-tokena_light_gray sm:mt-0">
          <img
            src="/assets/icons/params.svg"
            alt="parametre"
            width="18"
            height="18"
          />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-tokena_gray/30 text-sm font-semibold  uppercase text-tokena_dark dark:bg-tokena_dark_blue_2 dark:text-tokena_light_gray xl:text-base">
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2 text-left">Crypto</th>
              <th className="px-4 py-2 text-right">Prix</th>
              <th className="px-4 py-2 text-right">24h %</th>
              <th className="px-4 py-2 text-right">Volume 24h</th>
              <th className="px-4 py-2 text-right">Market Cap</th>
              <th className="px-4 py-2">Last 7 Days</th>
            </tr>
          </thead>
          <tbody>
            {currentCryptos.map((crypto, index) => (
              <tr
                key={crypto.id}
                className="border-b border-tokena_gray text-sm dark:border-tokena_dark_gray xl:text-xl"
              >
                <td className="text-center max-md:mx-2">
                  <button onClick={() => toggleFavorite(crypto.id)}>
                    {favorites.includes(crypto.id) ? (
                      <img
                        src="/assets/icons/star-filled.svg"
                        alt="Star filled"
                        width="20"
                        height="20"
                      />
                    ) : (
                      <img
                        src="/assets/icons/star-empty.svg"
                        alt="Star empty"
                        width="20"
                        height="20"
                      />
                    )}
                  </button>
                </td>
                <td className="px-4 py-2 text-center">
                  {indexOfFirstCrypto + index + 1}
                </td>
                <td className="w-72 p-2 xl:w-52 xl:px-4">
                  <div
                    className="flex cursor-pointer flex-nowrap items-center whitespace-nowrap text-sm xl:text-xl"
                    onClick={() => handleCryptoClick(crypto.id)}
                  >
                    <img
                      src={crypto.image}
                      alt={crypto.name}
                      className="mr-2 size-6"
                    />
                    <span className="font-medium">
                      {crypto.name} - {crypto.symbol.toUpperCase()}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-2 text-right text-sm max-md:ps-16 xl:text-lg">
                  ${crypto.current_price.toLocaleString()}
                </td>
                <td className="px-4 py-2 text-right">
                  <span
                    className={`rounded-full px-2 py-1 ${
                      crypto.price_change_percentage_24h > 0
                        ? "bg-tokena_green/20 text-tokena_green"
                        : "bg-tokena_red/20 text-tokena_red"
                    }`}
                  >
                    {crypto.price_change_percentage_24h.toFixed(2)}%
                  </span>
                </td>
                <td className="px-4 py-2 text-right text-sm xl:text-lg">
                  ${crypto.total_volume.toLocaleString()}
                </td>
                <td className="px-4 py-2 text-right text-sm xl:text-lg">
                  ${crypto.market_cap.toLocaleString()}
                </td>
                <td className="px-4 py-2">
                  <div className="mx-auto h-16 w-28 md:w-32 xl:w-40">
                    <Line
                      data={{
                        labels: crypto.sparkline_in_7d.price.map((_, i) => i),
                        datasets: [
                          {
                            data: crypto.sparkline_in_7d.price,
                            borderColor:
                              crypto.price_change_percentage_24h > 0
                                ? "#01B130"
                                : "#CB0101",
                            borderWidth: 1,
                            fill: false,
                            tension: 0.1,
                          },
                        ],
                      }}
                      options={chartOptions}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="mr-2 rounded border border-tokena_gray p-2"
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="ml-2 rounded border border-tokena_gray p-2"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        <div>
          <label htmlFor="rowsPerPage" className="mr-2">
            Rows per page:
          </label>
          <select
            id="rowsPerPage"
            value={rowsPerPage}
            onChange={handleRowsChange}
            className="rounded border border-tokena_gray p-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
      {isModalOpen && selectedCrypto && (
        <CryptoModal
          isOpen={isModalOpen}
          onClose={closeModal}
          crypto={selectedCrypto}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
};

export default CryptoTable;
