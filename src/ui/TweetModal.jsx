import { useCallback } from 'react';
import ModalComponent from "../components/Modal";
import { withTweets } from '../HOC/withTweets';
import { postTweet } from '../services/tweets';
import { sessionStore } from '../store/session.store';

function TweetModal({fetchTweets}) {
  const tweetContent = sessionStore(state => state.tweetModal);
  const session = sessionStore(state => state.session);

  const closeModal = useCallback(() => {
    sessionStore.setState({tweetModal: null});
  }, []);

  const setTweetContent = useCallback((newValue) => {
    sessionStore.setState((state) => ({
      ...state,
      tweetModal: {
        ...state.tweetModal,
        content: newValue
      }
    }));
  }, []);

  const handleSubmit = useCallback(() => {
    if (!tweetContent?.content || !session) {
      return closeModal();
    }

    postTweet(session?._id, tweetContent.content, tweetContent._id)
    .finally(() => {
      fetchTweets();
      closeModal();
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, tweetContent, closeModal]);

  if (!tweetContent) {
    return null;
  }

  return <ModalComponent
    title={tweetContent._id ? 'Edit Tweet' : 'New Tweet'}
    onClose={closeModal}
    onSubmit={handleSubmit}
  >
    <div className="">
      <textarea
        spellCheck="false"
        className={`
          w-full h-32 px-4 py-2 bg-slate-800 border
          placeholder-blue-200 placeholder-opacity-25 text-blue-200
          border-blue-200 shadow-sm focus:outline-none
        `}
        style={{minHeight: '225px'}}
        placeholder="Enter your tweet content"
        maxLength={280}
        value={tweetContent.content}
        onChange={({target: {value}}) => setTweetContent(value)}
      />
    </div>
  </ModalComponent>;
}

export default withTweets(TweetModal);
