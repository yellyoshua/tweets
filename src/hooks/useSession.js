import { useRouter } from 'next/router'
import { useEffect } from 'react';

export function useSession() {
	const router = useRouter()
	const { session } = router.query;

  useEffect(() => {
    if (!session && router.pathname !== '/') {
      router.replace('/');
    }
  }, [session, router]);

	return session;
}
