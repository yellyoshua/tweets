import { useCallback, useEffect, useState } from "react";
import SpinnerComponent from "../components/Spinner";
import { getTweets } from "../services/tweets";
import { sessionStore } from "../store/session.store";

export function withTweets(Component) {
  return function WrappedComponent({...props}) {
    const session = sessionStore(state => state.session);
    const [loading, setLoading] = useState(true);

    const fetchTweets = useCallback(() => {
      if (session) {
        setLoading(true);
        getTweets(session._id)
        .then((tweets) => sessionStore.setState({tweets}))
        .catch(() => sessionStore.setState({tweets: []}))
        .finally(() => setLoading(false));
      }
    }, [setLoading, session]);

    useEffect(() => {
      fetchTweets();
    }, [fetchTweets]);

    if (loading) {
      return <SpinnerComponent />;
    }

    return (
      <Component {...props} fetchTweets={fetchTweets} />
    );
  };
}
