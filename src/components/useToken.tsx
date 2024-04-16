import { useEffect, useState } from 'react';
import { fetchAuthSession, JWT } from 'aws-amplify/auth';

export function useAuthToken(): JWT | null {
  const [token, setToken] = useState<JWT | null>(null);

  useEffect(() => {
    async function currentSession() {
      try {
        const { idToken } = (await fetchAuthSession()).tokens ?? {};
        // console.log('idToken =>', idToken);
        if (idToken) {
          setToken(idToken);
          // console.log(`idToken =>, ${idToken}`);
        }
      } catch (err) {
        console.log(err);
      }
    }
    currentSession();
  }, []);

  return token;
}

