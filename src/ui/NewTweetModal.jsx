import { useState, useCallback } from 'react';
import ModalComponent from "../components/Modal";
import { postTweet } from '../services/tweets';

export default function NewTweetModal({session}) {
  const [tweet, setTweet] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!tweet) {
      return closeModal();
    }

    postTweet(session, tweet)
    .finally(() => {
      setTweet('');
      closeModal();
    });
  }, [session, tweet, closeModal]);

  return <div className='w-full mb-5'>
    <div className='flex justify-center items-center'>
      <button
        className="bg-purple-500 text-white text-base font-medium rounded-md px-3 py-2 shadow-sm hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300"
        onClick={openModal}
      >
        New Tweet
      </button>
    </div>
    {
      isOpen && <ModalComponent
        title="New Tweet"
        onClose={closeModal}
        onSubmit={handleSubmit}
      >
        <div className="">
          <textarea
            className="w-full h-32 px-4 py-2 bg-blue-100 border text-blue-700 placeholder-blue-400 border-blue-200 rounded-md shadow-sm focus:outline-none"
            placeholder="Enter your tweet content"
            value={tweet}
            onChange={({target: {value}}) => setTweet(value)}
          />
        </div>
      </ModalComponent>
    }
  </div>;
}
