// NewsCard.js
import React from "react";

const NewsCard = ({ source, timeAgo, title, content, likes, comments }) => {
  return (
    <div className="overflow-hidden rounded-lg bg-gray-100 shadow-md">
      <div className="p-4">
        <div className="mb-2 flex items-center">
          <img
            src="/path-to-coinmarketcap-logo.png"
            alt={source}
            className="mr-2 size-6 rounded-full"
          />
          <span className="text-sm text-gray-600">{source}</span>
          <span className="ml-2 text-sm text-gray-400">- {timeAgo}</span>
        </div>
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p className="mb-4 text-sm text-gray-600">{content}</p>
        <div className="flex items-center text-gray-500">
          <button className="mr-4 flex items-center">
            <svg
              className="mr-1 size-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            {likes}
          </button>
          <button className="flex items-center">
            <svg
              className="mr-1 size-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            {comments}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
