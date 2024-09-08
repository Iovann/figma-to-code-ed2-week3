import React, { useEffect, useState } from "react";
import { fetchTrendingCryptos } from "../utils/api";

const Trending = () => {
  const [trendingCryptos, setTrendingCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const balance = 63755200;

  useEffect(() => {
    const loadTrendingCryptos = async () => {
      try {
        const cryptos = await fetchTrendingCryptos();
        setTrendingCryptos(cryptos.slice(0, 4));
      } catch {
        setError(
          "Failed to load trending cryptocurrencies. Please reload the page."
        );
      } finally {
        setLoading(false);
      }
    };

    loadTrendingCryptos();
  }, []);

  return (
    <>
      <div className="flex flex-col items-start justify-center gap-4 px-4 dark:bg-tokena_dark_blue_1 dark:text-tokena_light_gray xl:flex-row xl:items-center">
        <div className="flex w-full flex-col gap-5 rounded-lg border p-2 shadow max-md:px-10 lg:p-4 xl:w-1/4">
          <h3 className="truncate text-2xl font-semibold">Balance</h3>
          <div className="flex items-center justify-between">
            <p className="truncate text-2xl font-bold">
              ${balance.toLocaleString()}
            </p>
            <p className="truncate text-sm font-medium text-tokena_dark_gray">
              <span className="mx-2 rounded-xl bg-tokena_green/15 px-2 py-1 font-semibold text-tokena_green">
                +2.3%
              </span>
              vs last month
            </p>
          </div>
          <div className="flex items-center justify-center gap-5">
            <div className="group flex w-full justify-center gap-2 rounded-2xl bg-tokena_blue/15 py-3 font-medium text-tokena_blue">
              <img
                src="/assets/icons/arrow-up.svg"
                alt="arrow-up"
                className="size-6 group-hover:animate-bounce"
              />
              Deposit
            </div>
            <div className="group flex w-full justify-center gap-2 rounded-2xl bg-tokena_blue/15 py-3 font-medium text-tokena_blue">
              <img
                src="/assets/icons/arrow-down.svg"
                alt="arrow-down"
                className="size-6 group-hover:animate-bounce"
              />
              Withdraw
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 overflow-hidden rounded-lg py-4 lg:p-4 xl:w-3/4">
          <div className="flex justify-between">
            <span className="truncate text-lg font-semibold">Trending</span>
            <div className="flex items-center truncate text-sm font-medium">
              View more
              <img
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                className="ms-2 size-3"
              />
            </div>
          </div>

          <div className="container mx-auto">
            {loading ? (
              <div className="flex h-full items-center justify-center">
                <p>Loading trending cryptos...</p>
              </div>
            ) : error ? (
              <div className="flex h-full items-center justify-center">
                <p>An error has occured please reload the page</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-2">
                {trendingCryptos.map((crypto, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-lg border px-2 py-4 shadow transition-transform hover:scale-105 md:p-4"
                  >
                    <div className="flex flex-col gap-3 overflow-hidden">
                      <div className="flex items-center justify-between overflow-hidden">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <img
                            src={crypto.item.small}
                            alt={`${crypto.item.name} icon`}
                            className="size-8 rounded-full md:size-9 2xl:size-12"
                          />
                          <div className="flex flex-col overflow-hidden">
                            <p className="max-w-xs truncate font-bold text-tokena_dark_gray dark:text-tokena_light_gray">
                              {crypto.item.name}
                            </p>
                            <p className="max-w-xs truncate font-bold uppercase text-tokena_dark_gray/35 dark:text-tokena_light_gray">
                              {crypto.item.symbol}
                            </p>
                          </div>
                        </div>
                        <div
                          className={`flex h-7 items-center gap-2 rounded-3xl px-1 font-semibold sm:px-2 ${
                            crypto.item.data.price_change_percentage_24h?.usd <
                            0
                              ? "bg-tokena_red/15 text-tokena_red"
                              : "bg-tokena_green/15 text-tokena_green"
                          }`}
                        >
                          {crypto.item.data.price_change_percentage_24h?.usd?.toFixed(
                            2
                          )}
                          %
                          <img
                            src={
                              crypto.item.data.price_change_percentage_24h
                                ?.usd >= 0
                                ? "/assets/icons/trade-up.svg"
                                : "/assets/icons/trade-down.svg"
                            }
                            alt="change-icon"
                            className="sm:w-6"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col overflow-hidden">
                        <p className="max-w-xs truncate font-bold uppercase text-tokena_dark_gray dark:text-tokena_light_gray">
                          {parseFloat(crypto.item.data.market_cap_btc).toFixed(
                            2
                          )}{" "}
                          {crypto.item.symbol}
                        </p>
                        <p className="max-w-xs truncate font-medium text-tokena_dark_gray dark:text-tokena_light_gray">
                          {crypto.item.data.market_cap}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Trending;
