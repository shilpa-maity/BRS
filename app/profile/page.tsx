'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function ProfilePage() {
  const [token, setToken] = useState('');
  const [profile, setProfile] = useState<any>(null);
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    if (!token) return;
    api.get('/profile', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => { setProfile(res.data); setForm({
        fullName: res.data.fullName,
        phone: res.data.phone,
        address: res.data.institute?.address,
        city: res.data.institute?.city,
        state: res.data.institute?.state,
        postalCode: res.data.institute?.postalCode,
      })})
      .catch(() => setProfile(null));
  }, [token]);

  const save = async () => {
    await api.patch('/profile', form, { headers: { Authorization: `Bearer ${token}` } });
    alert('Saved');
  }

  return (
    <div className="card space-y-3">
      <h1 className="text-xl font-semibold">Profile</h1>
      <input className="input" placeholder="JWT token" value={token} onChange={e=>setToken(e.target.value)} />
      {profile && (
        <>
          <div className="grid grid-cols-2 gap-3">
            {['fullName','phone','address','city','state','postalCode'].map((k)=> (
              <div key={k}>
                <label className="capitalize">{k}</label>
                <input className="input" value={form[k] || ''} onChange={e=>setForm({...form, [k]: e.target.value})} />
              </div>
            ))}
          </div>
          <button className="btn" onClick={save}>Save</button>
        </>
      )}
    </div>
  );
}
