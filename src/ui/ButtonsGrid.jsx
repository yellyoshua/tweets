import { useCallback, useEffect } from "react";
import ButtonComponent from "../components/Button";
import { withTweets } from "../HOC/withTweets";
import { sessionStore } from "../store/session.store";

function ButtonsGrid({fetchTweets}) {
  const isLoadingTweets = sessionStore(state => state.isLoadingTweets);

  const openNewTweetModal = useCallback(() => {
    sessionStore.setState({tweetModal: {content: ''}});
  }, []);

  useEffect(() => {
    fetchTweets();
  }, [fetchTweets]);

  return (
    <div className="grid gap-2 grid-cols-2">
      <ButtonComponent
        onClick={openNewTweetModal}
        className="bg-purple-500 text-white hover:bg-purple-600 focus:outline-none"
      >
        New Tweet
      </ButtonComponent>
      <ButtonComponent
        disabled={isLoadingTweets}
        onClick={fetchTweets}
        className="bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
      >
        Refresh Tweets
      </ButtonComponent>
    </div>
  )
}

export default withTweets(ButtonsGrid);
