import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js";

const CryptoModal = ({ isOpen, onClose, crypto }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (isOpen && chartRef.current && crypto) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: crypto.chartData.map((data) =>
            new Date(data[0]).toLocaleDateString()
          ),
          datasets: [
            {
              data: crypto.chartData.map((data) => data[1]),
              borderColor:
                crypto.price_change_percentage_24h > 0 ? "#10B981" : "#EF4444",
              fill: false,
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: "Date",
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: "Price (USD)",
              },
            },
          },
          elements: {
            point: {
              radius: 0,
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [isOpen, crypto]);

  if (!isOpen || !crypto) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden bg-black bg-opacity-50">
      <div className="w-full bg-white shadow-xl transition-transform duration-300 ease-in-out dark:bg-gray-800 md:w-2/3 lg:w-1/2 xl:w-1/3">
        <div className="flex h-full flex-col p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {crypto.name}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              X
            </button>
          </div>

          <div className="grow">
            <canvas ref={chartRef} className="h-64 w-full"></canvas>
          </div>

          <div className="mt-4 space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Price:</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                ${crypto.current_price.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">
                Market Cap:
              </span>
              <span className="font-semibold text-gray-800 dark:text-white">
                ${crypto.market_cap.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">
                24h Volume:
              </span>
              <span className="font-semibold text-gray-800 dark:text-white">
                ${crypto.total_volume.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">
              Description
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {crypto.description.en.slice(0, 200)}...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoModal;
