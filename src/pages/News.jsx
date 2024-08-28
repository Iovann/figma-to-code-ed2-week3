import React from "react";
import NewsCard from "../components/NewsCard";
import ContentWrapper from "../layout/ContentWrapper";

const Home = () => {
  const newsData = [
    {
      id: 1,
      source: "CoinMarketCap",
      timeAgo: "7 hours ago",
      title: "Ethereum's Merge Coming and the Stakes Couldn't Be Higher",
      content:
        "The most important upgrade in blockchain history is slated for August. And the outcome of Ethe...",
      likes: 5,
      comments: 5,
    },
    {
      id: 1,
      source: "CoinMarketCap",
      timeAgo: "7 hours ago",
      title: "Ethereum's Merge Coming and the Stakes Couldn't Be Higher",
      content:
        "The most important upgrade in blockchain history is slated for August. And the outcome of Ethe...",
      likes: 5,
      comments: 5,
    },
    {
      id: 1,
      source: "CoinMarketCap",
      timeAgo: "7 hours ago",
      title: "Ethereum's Merge Coming and the Stakes Couldn't Be Higher",
      content:
        "The most important upgrade in blockchain history is slated for August. And the outcome of Ethe...",
      likes: 5,
      comments: 5,
    },
    {
      id: 1,
      source: "CoinMarketCap",
      timeAgo: "7 hours ago",
      title: "Ethereum's Merge Coming and the Stakes Couldn't Be Higher",
      content:
        "The most important upgrade in blockchain history is slated for August. And the outcome of Ethe...",
      likes: 5,
      comments: 5,
    },
  ];

  return (
    <ContentWrapper>
      <section className="container mx-auto px-4 py-8">
        <h2 className="mb-6 text-2xl font-bold">Latest crypto news</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {newsData.map((news) => (
            <NewsCard key={news.id} {...news} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <button className="rounded border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 shadow">
            Load more
          </button>
        </div>
      </section>
    </ContentWrapper>
  );
};

export default Home;
