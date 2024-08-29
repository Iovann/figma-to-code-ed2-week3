import React from "react";

const NewsCard = ({
  source,
  timeAgo,
  title,
  content,
  likes,
  comments,
  urlToImage,
}) => {
  return (
    <div className="overflow-hidden rounded-lg bg-tokena_dark_gray/5 shadow-md">
      <div className="p-4">
        <div className="mb-3 flex flex-col">
          <div className="flex items-center">
            <img
              src="/assets/icons/coin.svg" // Remplacer par le logo du source
              alt={source}
              className="mr-2 size-6 rounded-full"
            />
            <span className="font-semibold text-gray-600">{source}</span>
          </div>
          <p>
            <span className="font-medium">News</span>
            <span className="ml-2">- {timeAgo}</span>
          </p>
        </div>
        {urlToImage ? (
          <div
            className="mb-4 rounded-3xl bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${urlToImage})`,
              width: "315px",
              height: "195px",
            }}
          ></div>
        ) : (
          <div className="mb-4 h-[195px] w-[315px] rounded-3xl bg-gray-200"></div>
        )}
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p className="mb-4 text-sm text-gray-600">{content}</p>
        <div className="flex items-center text-gray-500">
          <button className="mr-4 flex items-center">
            <img
              src="/assets/icons/heart.svg"
              alt="heart icon"
              className="mx-1 size-6"
              width="18"
              height="18"
            />
            {likes}
          </button>
          <button className="flex items-center">
            <img
              src="/assets/icons/comment.svg"
              alt="comment icon"
              className="mx-1 size-6"
              width="18"
              height="18"
            />
            {comments}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
