import {
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const CryptoModal = ({
  isOpen,
  onClose,
  crypto,
  favorites,
  toggleFavorite,
}) => {
  useEffect(() => {
    if (!isOpen) return;
  }, [isOpen, crypto]);

  if (!isOpen || !crypto) return null;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Prix de ${crypto.name} sur les 10 derniers jours`,
      },
    },
  };

  const isFavorite = favorites.includes(crypto.id);

  const filteredData = crypto.chartData.reduce((acc, curr) => {
    const date = new Date(curr[0]).toLocaleDateString("fr-FR");
    if (!acc.find((item) => item.date === date)) {
      acc.push({ date, value: curr[1] });
    }
    return acc;
  }, []);

  const data = {
    labels: filteredData.map((data) => data.date),
    datasets: [
      {
        label: "Prix",
        data: filteredData.map((data) => data.value),
        borderColor:
          crypto.market_data.price_change_24h > 0 ? "#01B130" : "#CB0101",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        fill: false,
        tension: 0.1,
        pointRadius: 4,
        pointBackgroundColor:
          crypto.market_data.price_change_24h > 0 ? "#01B130" : "#CB0101",
      },
    ],
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative max-w-2xl rounded-lg  bg-white p-4 shadow-lg dark:bg-tokena_dark_blue_1 max-sm:mx-2 max-sm:w-full">
        {/* Bouton de fermeture du modal */}
        <button
          className="absolute right-2 top-2 rounded-full bg-tokena_dark_gray/25 p-1"
          onClick={onClose}
        >
          <img
            src="/assets/icons/close.svg"
            alt="Close button"
            width="20"
            height="20"
          />
        </button>
        <div className="p-4">
          {/* Graphique de prix */}
          <div>
            <Line options={options} data={data} />
          </div>

          {/* Informations sur la crypto */}
          <div className="mt-2 flex flex-col items-start gap-2">
            <div className="flex w-full items-center justify-between">
              <h2 className="mb-2 flex items-center text-xl font-semibold dark:text-white">
                <img
                  src={crypto.image.small}
                  alt={crypto.name}
                  className="mr-2 size-6"
                />
                {crypto.name} ({crypto.symbol.toUpperCase()} - USD)
              </h2>
              <div className="text-base font-medium text-tokena_dark dark:text-white lg:text-lg">
                ${crypto.market_data.current_price.usd}
              </div>
            </div>

            <div className="flex w-full items-center justify-between">
              <span className="text-base font-medium text-tokena_dark dark:text-white lg:text-lg">
                Crypto Market Rank
              </span>
              <span className="rounded-full bg-tokena_dark_gray/15 p-2 text-sm font-medium font-semibold text-tokena_dark_gray dark:text-gray-400 lg:text-base">
                Rank #{crypto.market_cap_rank}
              </span>
            </div>

            <div className="flex w-full items-center justify-between">
              <span className="text-base font-medium text-tokena_dark dark:text-white lg:text-lg">
                Market Cap
              </span>
              <span className="text-sm font-medium text-tokena_dark_gray dark:text-gray-400 lg:text-base">
                $ {crypto.market_data.market_cap.usd}
              </span>
            </div>

            <div className="flex w-full items-center justify-between">
              <span className="text-base font-medium text-tokena_dark dark:text-white lg:text-lg">
                Circulating supply
              </span>
              <span className="text-sm font-medium text-tokena_dark_gray dark:text-gray-400 lg:text-base">
                {crypto.market_data.circulating_supply}
              </span>
            </div>
            <div className="flex w-full items-center justify-between">
              <span className="text-base font-medium text-tokena_dark dark:text-white lg:text-lg">
                24 Hour High
              </span>
              <span className="text-sm font-medium text-tokena_dark_gray dark:text-gray-400 lg:text-base">
                ${crypto.market_data.high_24h.usd}
              </span>
            </div>
            <div className="flex w-full items-center justify-between">
              <span className="text-base font-medium text-tokena_dark dark:text-white lg:text-lg">
                24 Hour low
              </span>
              <span className="text-sm font-medium text-tokena_dark_gray dark:text-gray-400 lg:text-base">
                ${crypto.market_data.low_24h.usd}
              </span>
            </div>
            {/* Description de la crypto */}
            <div className="flex flex-col items-start justify-center gap-2">
              <h3 className="mt-1 text-sm font-medium text-tokena_dark dark:text-white lg:text-base">
                Description
              </h3>
              <p className="break-words text-sm text-tokena_dark_gray dark:text-gray-400">
                {crypto.description?.en.split(".")[0]}
              </p>
            </div>
            <div
              className="flex w-full cursor-pointer items-center justify-center rounded-3xl bg-tokena_blue/15 p-4 text-center"
              onClick={() => toggleFavorite(crypto.id)}
            >
              {isFavorite ? (
                <>
                  <img
                    src="/assets/icons/blue-star-filled.svg"
                    alt="star"
                    width="20"
                    height="20"
                  />
                  <span className="mx-4 font-medium text-tokena_blue">
                    Remove from favorites
                  </span>
                </>
              ) : (
                <>
                  <img
                    src="/assets/icons/blue-star-empty.svg"
                    alt="star"
                    width="20"
                    height="20"
                  />
                  <span className="mx-4 font-medium text-tokena_blue">
                    Add to favorites
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoModal;
