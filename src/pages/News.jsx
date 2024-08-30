import React, { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import ContentWrapper from "../layout/ContentWrapper";
import news from "../utils/news";

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayedItems, setDisplayedItems] = useState(16);

  const fetchNews = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=tesla&from=2024-07-29&sortBy=publishedAt&apiKey=${
          import.meta.env.VITE_APP_NEWS_API_KEY
        }`
      );
      const data = await response.json();

      // Vérifiez si data.articles est un tableau
      if (!Array.isArray(data.articles)) {
        console.error("La réponse API n'est pas un tableau :", data.articles);
        return news;
      }

      return data.articles;
    } catch (error) {
      console.error("Erreur lors de la récupération des nouvelles :", error);
      return news;
    }
  };

  useEffect(() => {
    const loadNews = async () => {
      try {
        const fetchedNews = await fetchNews();
        setNewsData((prevData) => [...prevData, ...fetchedNews]);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  const handleLoadMore = () => {
    setDisplayedItems((prev) => prev + 16);
  };

  const handleLoadLess = () => {
    setDisplayedItems((prev) => Math.max(prev - 16, 16));
  };

  if (loading)
    return <div className="flex items-center justify-center">Loading...</div>;

  return (
    <ContentWrapper>
      <section className="mx-auto py-8">
        <h2 className="mb-6 text-2xl font-bold">Latest crypto news</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {newsData
            .filter((news) => news.urlToImage)
            .slice(0, displayedItems)
            .map((news, index) => (
              <NewsCard
                key={index}
                source={news.source.name || "Unknown Source"}
                timeAgo={new Date(news.publishedAt).toLocaleDateString("en-US")}
                title={
                  news.title.length > 100
                    ? `${news.title.substring(0, 97)}...`
                    : news.title
                }
                content={
                  news.description.length > 300
                    ? `${news.description.substring(0, 297)}...`
                    : news.description
                }
                likes={Math.floor(Math.random() * 100)}
                comments={Math.floor(Math.random() * 50)}
                urlToImage={news.urlToImage || "/path/to/default/image.jpg"}
              />
            ))}
        </div>
        <div className="mt-8 text-center">
          <button
            className="mr-4 rounded border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 shadow"
            onClick={handleLoadLess}
            disabled={displayedItems <= 16}
          >
            Show Less
          </button>
          <button
            className="rounded border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 shadow"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </div>
      </section>
    </ContentWrapper>
  );
};

export default News;
