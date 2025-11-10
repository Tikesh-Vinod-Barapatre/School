import React, { useEffect, useMemo, useState } from 'react';
import './Search.css';
import { searchTracks } from '../services/music';
import { searchUsers } from '../services/users';

const Search = () => {
  const [q, setQ] = useState('');
  const [tab, setTab] = useState('music'); // 'music' | 'users'
  const [loading, setLoading] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [users, setUsers] = useState([]);
  const debounced = useDebounce(q, 350);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!debounced) { setTracks([]); setUsers([]); return; }
      setLoading(true);
      try {
        if (tab === 'music') {
          const data = await searchTracks(debounced);
          if (!cancelled) setTracks(data.tracks || []);
        } else {
          const data = await searchUsers(debounced);
          if (!cancelled) setUsers(data.users || []);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => { cancelled = true; };
  }, [debounced, tab]);

  return (
    <div className="search-page layout-shell">
      <header className="search-header">
        <div className="search-hero glass bg-overlay-gradient">
          <img className="hero-bg" alt="hero" src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1600&q=80" />
          <div className="hero-content">
            <h1 className="section-title">Search</h1>
            <div className="tabs">
              <button className={`tab ${tab==='music'?'active':''}`} onClick={()=>setTab('music')}>Music</button>
              <button className={`tab ${tab==='users'?'active':''}`} onClick={()=>setTab('users')}>Users</button>
            </div>
            <div className="search-bar">
              <span className="prefix">/</span>
              <input className="glass-input" value={q} onChange={e=>setQ(e.target.value)} placeholder={tab==='music'?"Search songs, artists, albums":"Search people by name or email"} />
              <button className="btn-primary pill" onClick={()=>setQ(q)}>Search</button>
            </div>
          </div>
        </div>
      </header>

      {tab==='music' ? (
        <section className="results grid grid-auto-fit">
          {loading && <div className="muted">Searching music…</div>}
          {!loading && tracks.map(r => (
            <div key={r.id} className="card glass fade-in">
              <div className="card-cover">
                <img src={r.cover} alt={r.title} />
              </div>
              <div className="card-body">
                <div className="card-title">{r.title}</div>
                <div className="card-sub">{r.artist}</div>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <section className="results grid grid-auto-fit">
          {loading && <div className="muted">Searching users…</div>}
          {!loading && users.map(u => (
            <div key={u._id} className="card glass fade-in">
              <div className="card-cover">
                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(u.name || u.email)}`} alt={u.name} />
              </div>
              <div className="card-body">
                <div className="card-title">{u.name}</div>
                <div className="card-sub">{u.email}</div>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

function useDebounce(value, delay) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
}

export default Search;
