import { useEffect, useState } from "react";
import SpinnerComponent from "../components/Spinner";
import { getTweets } from "../services/tweets";

export function withTweets(Component) {
  return function WrappedComponent({session, ...props}) {
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setLoading(true);
      getTweets(session)
        .then(setTweets)
        .finally(() => setLoading(false));
    }, [session]);

    if (loading) {
      return <SpinnerComponent />;
    }

    return (
      <Component {...props} tweets={tweets} />
    );
  };
}
