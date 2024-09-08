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
    <div className="overflow-hidden rounded-2xl border border-tokena_light_gray bg-tokena_white dark:bg-tokena_dark_blue_2">
      <div className="p-4">
        <div className="mb-3 flex flex-col">
          <div className="flex items-center">
            <img
              src="/assets/icons/coin.svg"
              alt={source}
              className="mr-2 size-6 rounded-full"
            />
            <span className="font-semibold text-gray-600 dark:text-tokena_white">
              {source}
            </span>
          </div>
          <p>
            <span className="font-medium">News</span>
            <span className="ml-2">- {timeAgo}</span>
          </p>
        </div>
        {urlToImage ? (
          <div
            className="mb-4 h-48 w-full rounded-3xl bg-cover bg-center bg-no-repeat max-sm:h-64 2xl:h-64"
            style={{
              backgroundImage: `url(${urlToImage})`,
            }}
          ></div>
        ) : (
          <div className="mb-4 h-48 w-full rounded-3xl bg-gray-200"></div>
        )}
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p className="mb-4 text-sm text-gray-600 dark:text-tokena_white">
          {content}
        </p>
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
