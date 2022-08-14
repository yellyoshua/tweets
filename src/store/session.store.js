import createStore from 'zustand';

const initialState = {
  session: null,
  tweets: [],
  isLoadingTweets: false,
  tweetModal: null,
};

export const sessionStore = createStore(() => ({
	...initialState,
}));
