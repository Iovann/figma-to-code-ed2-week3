import React, { useState, useEffect } from "react";
import { fetchTrendingCryptos } from "../utils/api";

const Trending = () => {
  const [trendingCryptos, setTrendingCryptos] = useState([]);
  const balance = 63755200; // Exemple de solde statique

  useEffect(() => {
    const loadTrendingCryptos = async () => {
      const cryptos = await fetchTrendingCryptos();
      setTrendingCryptos(cryptos.slice(0, 4)); // Limitons à 4 cryptos pour cet exemple
    };
    loadTrendingCryptos();
  }, []);

  return (
    <>
      <div className="flex flex-col items-start justify-center gap-4 xl:flex-row xl:items-center">
        <div className="flex w-full flex-col gap-5 rounded-lg border p-4 shadow xl:w-1/4">
          <h3 className="text-2xl font-semibold">Balance</h3>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">${balance.toLocaleString()}</p>
            <p className="text-sm font-medium text-tokena_dark_gray">
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

        <div className="flex w-full flex-col gap-3 rounded-lg p-4 xl:w-3/4">
          <div className="flex justify-between">
            <span className="text-lg font-semibold">Trending</span>
            <div className="flex items-center text-sm font-medium">
              View more
              <img
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                className="ms-2 size-3"
              />
            </div>
          </div>

          <div className="container mx-auto">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {trendingCryptos.map((crypto, index) => (
                <div
                  key={index}
                  className="rounded-lg border px-2 py-4 shadow transition-transform hover:scale-105 md:p-4"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <img
                          src={crypto.item.small}
                          alt={`${crypto.item.name} icon`}
                          className="size-12 rounded-full"
                        />
                        <div className="flex flex-col">
                          <p className="overflow-hidden text-ellipsis font-bold text-tokena_dark_gray max-sm:max-w-7">
                            {crypto.item.name}
                          </p>
                          <p className="overflow-hidden text-ellipsis font-bold uppercase text-tokena_dark_gray/35 max-sm:max-w-7">
                            {crypto.item.symbol}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`flex h-7 items-center gap-2 rounded-3xl px-1 font-semibold sm:px-2 ${
                          crypto.item.data.price_change_percentage_24h?.usd < 0
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
                            crypto.item.data.price_change_percentage_24h?.usd >=
                            0
                              ? "/assets/icons/trade-up.svg"
                              : "/assets/icons/trade-down.svg"
                          }
                          alt="change-icon"
                          className="sm:w-6"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-bold uppercase text-tokena_dark_gray">
                        {crypto.item.data.price}
                      </p>
                      <p className="font-medium text-tokena_dark_gray">
                        Market Cap: $
                        {crypto.item.data.market_cap?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Trending;
