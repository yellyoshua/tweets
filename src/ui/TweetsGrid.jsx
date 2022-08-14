import { useCallback } from 'react';
import GridComponent from '../components/Grid';
import SpinnerComponent from '../components/Spinner';
import { sessionStore } from '../store/session.store';

export default function TweetsGrid() {
  const tweets = sessionStore(state => state.tweets);
  const isLoadingTweets = sessionStore(state => state.isLoadingTweets);

  const editTweetModal = useCallback((tweet) => {
    sessionStore.setState({tweetModal: tweet});
  }, []);

  if (isLoadingTweets) {
    return <div className='mt-10'>
      <SpinnerComponent />
    </div>;
  }

  return <div className='mt-10'>
    <GridComponent tweets={tweets} onEditTweet={editTweetModal} />
  </div>
}
