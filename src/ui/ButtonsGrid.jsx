import { useCallback, useEffect } from "react";
import ButtonComponent from "../components/Button";
import PencilIcon from "../components/icons/PencilIcon";
import RefreshIcon from "../components/icons/RefreshIcon";
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
    <div className="grid gap-2 grid-cols-2 select-none">
      <ButtonComponent
        onClick={openNewTweetModal}
        className="bg-purple-500 text-white hover:bg-purple-600 focus:outline-none flex justify-center items-center"
      >
        <PencilIcon className="h-4 w-4 m-1" /> New Tweet
      </ButtonComponent>
      <ButtonComponent
        disabled={isLoadingTweets}
        onClick={fetchTweets}
        className="bg-blue-500 text-white hover:bg-blue-600 focus:outline-none flex justify-center items-center"
      >
        <RefreshIcon className="h-4 w-4 m-1" /> Refresh Tweets
      </ButtonComponent>
    </div>
  )
}

export default withTweets(ButtonsGrid);
