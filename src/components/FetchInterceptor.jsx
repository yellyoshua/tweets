import { useCallback, useEffect } from "react";

const isBrowser = typeof window !== 'undefined';

export default function FetchInterceptor({afterRequest = null}) {

  const trottle = useCallback((func, limit = 300) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }, []);

  const afterRequestTrottle = trottle((response) => {
    if (afterRequest) {
      return afterRequest(response);
    };
  }, 200);

  const applyInterceptor = useCallback(() => {
    if (isBrowser) {
      const originalFetch = window.fetch;

      window.fetch = function() {
        return originalFetch(...arguments).then(async (response) => {
          await Promise.resolve(afterRequestTrottle(response.clone()));
          return response;
        });
      };
    }
  }, [afterRequestTrottle]);

  useEffect(() => {
    applyInterceptor();
  }, [applyInterceptor]);

  return null;
}
