'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function DashboardPage() {
  const [token, setToken] = useState('');
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!token) return;
    api.get('/dashboard', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setData(res.data))
      .catch(() => setData(null));
  }, [token]);

  return (
    <div className="card space-y-4">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <input className="input" placeholder="JWT token" value={token} onChange={e=>setToken(e.target.value)} />
      {data ? (
        <div className="space-y-2">
          <p>Status: <b>{data.accountStatus}</b></p>
          <p>Profile Completion: <b>{data.profileCompletion}%</b></p>
          <div>
            <h3 className="font-medium mt-4 mb-2">Notifications</h3>
            <ul className="list-disc ml-5 space-y-1">
              {data.notifications?.map((n:any) => (
                <li key={n.id}><b>{n.title}</b> — {n.message}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : <p className="text-sm text-[var(--muted)]">Enter a token to load.</p>}
    </div>
  );
}
