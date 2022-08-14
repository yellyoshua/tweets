import createStore from 'zustand';

const initialState = {
  session: null,
  tweets: [],
};

export const sessionStore = createStore(() => ({
	...initialState,
}));
