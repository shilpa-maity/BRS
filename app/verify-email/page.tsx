'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';

export default function VerifyEmailPage() {
  const sp = useSearchParams();
  const token = sp.get('token');
  const [state, setState] = useState<string>('');

  useEffect(() => {
    async function run() {
      if (token) {
        try {
          const { data } = await api.get('/verify-email', { params: { token } });
          setState(data.state);
        } catch (e: any) {
          setState(e?.response?.data?.state || 'Invalid');
        }
      }
    }
    run();
  }, [token]);

  return (
    <div className="card">
      <h1 className="text-xl font-semibold">Email Verification</h1>
      <p className="mt-2">State: <b>{state || 'Open this page from your email link.'}</b></p>
    </div>
  );
}
