import { useEffect, useState } from "react";
import AuthComponent from "../components/Auth";
import { getTwitterSession } from "../services/twitter";
import { sessionStore } from "../store/session.store";

export default function Authentication({login, session, children}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session) {
      setIsLoading(true);
      getTwitterSession(session)
      .then((session) => {
        sessionStore.setState({session});
        setIsAuthenticated(true);
      }).catch(() => {
        sessionStore.setState({session: null});
        setIsAuthenticated(false);
      }).finally(() => setIsLoading(false));
    }
  }, [session]);

  return (
    <AuthComponent
      isAuthenticated={isAuthenticated}
      isLoading={isLoading}
      login={login}
    >
      {children}
    </AuthComponent>
  )

}
