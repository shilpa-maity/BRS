'use client';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export default function NotificationsPage() {
  const [token, setToken] = useState('');
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    if (!token) return;
    api.get('/notifications', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setItems(res.data))
      .catch(() => setItems([]));
  }, [token]);

  return (
    <div className="card space-y-3">
      <h1 className="text-xl font-semibold">Notifications</h1>
      <input className="input" placeholder="JWT token" value={token} onChange={e=>setToken(e.target.value)} />
      <ul className="list-disc ml-5 space-y-1">
        {items.map(n => <li key={n.id}><b>{n.title}</b> — {n.message}</li>)}
      </ul>
    </div>
  );
}
