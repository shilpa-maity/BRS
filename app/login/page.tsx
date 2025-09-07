'use client';
import { useState } from 'react';
import { api } from '@/lib/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const login = async () => {
    const { data } = await api.post('/auth/login', { email, password });
    setToken(data.token);
  };

  return (
    <div className="card space-y-3">
      <h1 className="text-xl font-semibold">Login (helper)</h1>
      <input className="input" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="input" placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="btn" onClick={login}>Login</button>
      {token && <p className="text-xs break-all mt-2">JWT: {token}</p>}
    </div>
  );
}
