'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.

import { useAuth } from '@/utils/context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace('/posts');
    }
  }, [user, router]);

  return null;
}

export default Home;
