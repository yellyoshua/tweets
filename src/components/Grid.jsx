export default function GridComponent({tweets = []}) {
  const orderedTweets = Array.from(tweets).reverse();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-start gap-3">
        {orderedTweets.map(tweet => {
          return (
            <div key={tweet._id} className="bg-slate-800 p-4 rounded-lg">
              {tweet.posted
                ? <p className="text-sm line-through">{tweet.content}</p>
                : <p className="text-sm">{tweet.content}</p>}
            </div>
          );
        })}
      </div>
    </div>
  )
}
