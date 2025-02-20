'use client'

import { useEffect, useState } from 'react';

export default function Home() {
  const [session, setSession] = useState<Record<string, any>>({});

  const getAccessToken = () => {
    return fetch('http://localhost:3000/api/auth/session')
      .then((response) => response.json())
      .then((data) => setSession(data))
  }

  useEffect(() => {
    getAccessToken();
  }, []);

  return (
    <div>
      <p>user: {session?.user?.name}</p>
      <p>email: {session?.user?.email}</p>
      <p>image: {session?.user?.image}</p>
      <p>expires: {session?.expires}</p>
      <p>access_token: {session?.access_token}</p>
    </div>
  );
}
