import GridComponent from '../components/Grid';
import {withTweets} from '../HOC/withTweets';
import { sessionStore } from '../store/session.store';

function TweetsGrid({fetchTweets}) {
  const tweets = sessionStore(state => state.tweets);

  return <div>
    <div className='flex justify-center items-center mb-4'>
      <button
        className="bg-blue-500 text-white text-base font-medium rounded-md px-3 py-2 shadow-sm hover:bg-blue-600 focus:outline-none"
        onClick={fetchTweets}
      >
        Refresh tweets
      </button>
    </div>
    <GridComponent tweets={tweets} />
  </div>
}

export default withTweets(TweetsGrid);
