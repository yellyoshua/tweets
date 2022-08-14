import { useCallback } from "react";
import { sessionStore } from "../store/session.store";

export function withSession(Component) {
  return function WrappedComponent({...props}) {
    const session = sessionStore(state => state.session);

    const logout = useCallback(() => {
      sessionStore.setState({session: null});
      sessionStore.setState({tweets: []});
      window.location.replace("/");
    }, []);

    if (!session) {
      return null;
    }

    return (
      <Component {...props} logout={logout} session={session} />
    );
  };
}
