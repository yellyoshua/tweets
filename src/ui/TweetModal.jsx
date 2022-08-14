import { useCallback } from 'react';
import ModalComponent from "../components/Modal";
import { postTweet } from '../services/tweets';
import { sessionStore } from '../store/session.store';

export default function TweetModal({session}) {
  const tweetContent = sessionStore(state => state.tweetModal);

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
    if (!tweetContent?.content) {
      return closeModal();
    }

    postTweet(session, tweetContent.content, tweetContent._id)
    .finally(() => {
      closeModal();
    });
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
        className="w-full h-32 px-4 py-2 bg-slate-700 border text-blue-200 placeholder-blue-400 border-blue-200 rounded-md shadow-sm focus:outline-none"
        placeholder="Enter your tweet content"
        value={tweetContent.content}
        onChange={({target: {value}}) => setTweetContent(value)}
      />
    </div>
  </ModalComponent>;
}
