'use client';
import { useState } from 'react';
import { api } from '@/lib/api';

export default function VerifyPhonePage() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<string>('');

  const send = async () => {
    try {
      await api.post('/otp/send', { phone });
      setStatus('OTP sent');
    } catch (e:any) {
      setStatus(e?.response?.data?.message || 'Error');
    }
  };

  const verify = async () => {
    try {
      const { data } = await api.post('/otp/verify', { phone, code });
      setStatus(data.state);
    } catch (e:any) {
      setStatus(e?.response?.data?.state || 'Error');
    }
  };

  return (
    <div className="card space-y-3">
      <h1 className="text-xl font-semibold">Phone Verification</h1>
      <input className="input" placeholder="+91XXXXXXXXXX" value={phone} onChange={e=>setPhone(e.target.value)} />
      <div className="flex gap-2">
        <button className="btn" onClick={send}>Send OTP</button>
      </div>
      <input className="input" placeholder="6-digit OTP" value={code} onChange={e=>setCode(e.target.value)} />
      <button className="btn" onClick={verify}>Verify</button>
      <p className="text-sm text-[var(--muted)]">Status: {status}</p>
    </div>
  );
}
