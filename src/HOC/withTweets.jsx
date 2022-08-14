import { useCallback } from "react";
import { getTweets } from "../services/tweets";
import { sessionStore } from "../store/session.store";

export function withTweets(Component) {
  return function WrappedComponent({...props}) {
    const session = sessionStore(state => state.session);

    const fetchTweets = useCallback(() => {
      if (session) {
        sessionStore.setState({isLoadingTweets: true});
        getTweets(session._id)
        .then((tweets) => sessionStore.setState({tweets}))
        .catch(() => sessionStore.setState({tweets: []}))
        .finally(() => sessionStore.setState({isLoadingTweets: false}));
      }
    }, [session]);

    return (
      <Component {...props} fetchTweets={fetchTweets} />
    );
  };
}
