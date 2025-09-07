'use client';
import { useState } from 'react';
import { api } from '@/lib/api';

export default function KycPage() {
  const [token, setToken] = useState(''); // paste JWT after login (for demo)
  const [category, setCategory] = useState('Document');
  const [files, setFiles] = useState<FileList | null>(null);
  const [status, setStatus] = useState<string>('');

  const upload = async () => {
    if (!files?.length) return;
    const form = new FormData();
    Array.from(files).forEach(f => form.append('files', f));
    form.append('category', category);
    try {
      const { data } = await api.post('/kyc/upload', form, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type':'multipart/form-data' }
      });
      setStatus(data.message);
    } catch (e:any) {
      setStatus(e?.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="card space-y-3">
      <h1 className="text-xl font-semibold">KYC Upload</h1>
      <input className="input" placeholder="JWT token" value={token} onChange={e=>setToken(e.target.value)} />
      <input className="input" placeholder="Category (e.g., Admin ID)" value={category} onChange={e=>setCategory(e.target.value)} />
      <input className="input" type="file" multiple onChange={e=>setFiles(e.target.files)} />
      <button className="btn" onClick={upload}>Upload</button>
      <p className="text-sm text-[var(--muted)]">Status: {status}</p>
    </div>
  );
}
