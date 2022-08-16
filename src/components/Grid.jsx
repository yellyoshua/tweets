import { sessionStore } from "../store/session.store";
import ExternalLinkIcon from "./icons/ExternalLinkIcon";
import PencilIcon from "./icons/PencilIcon";

export default function GridComponent({tweets = [], onEditTweet}) {
  const session = sessionStore(state => state.session);

  if (!tweets.length) {
    return <div className="flex justify-center items-center mt-14">
      <p className="text-gray-500">No tweets to display</p>
    </div>;
  }

  const renderEditTweet = (tweet) => {
    return !tweet.posted && (
      <button
        className="text-white text-base rounded-md font-medium shadow-sm bg-blue-600 focus:outline-none select-none"
        onClick={() => onEditTweet(tweet)}
      >
        <PencilIcon className="h-4 w-4 m-1" />
      </button>
    );
  }

  const renderTweetLink = (tweet) => {
    if (!tweet.twitterId) {
      return null;
    }

    return <a
      href={`https://twitter.com/${session.username}/status/${tweet.twitterId}`}
      className="text-white text-base font-medium shadow-sm bg-purple-600 focus:outline-none select-none"
      target="_blank"
      rel="noopener noreferrer"
    >
      <ExternalLinkIcon className="h-4 w-4 m-1" />
    </a>
  }

  const renderTweetContent = (tweet) => {
    const content = String(tweet.content);

    return <p
      className={`
        text-sm break-words mt-2
        ${tweet.posted && 'line-through text-green-500'}
      `}
    >
      {content.length > 140
        ? content.substring(0, 140) + '...'
        : content}
    </p>
  }

  const renderBadgeId = (index) => {
    return <span
      className={`
        bg-white text-slate-800 text-xs font-bold shadow-sm focus:outline-none select-none
        absolute left-1 top-1 px-1 rounded-full
      `}
    >
      {index + 1}
    </span>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-start gap-3">
        {tweets.map((tweet, index) => {
          return (
            <div key={tweet._id} className="bg-slate-800 p-4 rounded-lg relative">
              {renderBadgeId(index)}
              {renderTweetContent(tweet)}

              <div className="flex justify-end">
                {renderTweetLink(tweet)}
                {renderEditTweet(tweet)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}
