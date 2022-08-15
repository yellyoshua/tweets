import { sessionStore } from "../store/session.store";

export default function GridComponent({tweets = [], onEditTweet}) {
  const session = sessionStore(state => state.session);
  const orderedTweets = Array.from(tweets).reverse();

  if (!orderedTweets.length) {
    return <div className="flex justify-center items-center mt-14">
      <p className="text-gray-500">No tweets to display</p>
    </div>;
  }

  const renderEditTweet = (tweet) => {
    return !tweet.posted && (
      <button
        className="bg-slate-600 text-white text-base font-medium shadow-sm hover:bg-purple-600 focus:outline-none select-none"
        onClick={() => onEditTweet(tweet)}
      >
        📝
      </button>
    );
  }

  const renderTweetLink = (tweet) => {
    if (!tweet.twitterId) {
      return null;
    }

    return <a
      href={`https://twitter.com/${session.username}/status/${tweet.twitterId}`}
      className="bg-slate-600 text-white text-base font-medium shadow-sm hover:bg-purple-600 focus:outline-none select-none"
      target="_blank"
      rel="noopener noreferrer"
    >
      🔗
    </a>
  }

  const renderTweetContent = (tweet) => {
    return tweet.posted
      ? <p className="text-sm line-through break-words">{tweet.content}</p>
      : <p className="text-sm break-words">{tweet.content}</p>
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-start gap-3">
        {orderedTweets.map(tweet => {
          return (
            <div key={tweet._id} className="bg-slate-800 p-4 rounded-lg">
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
