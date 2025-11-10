import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Player from '../components/Player';
import './Dashboard.css';
import { getRecommendations, getRadio, getJamendoStatus, startJamendoOAuth } from '../services/music';

const Dashboard = () => {
  const [reco, setReco] = useState([]);
  const [radio, setRadio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [status, r1, r2] = await Promise.all([
          getJamendoStatus().catch(()=>({connected:false})),
          getRecommendations(),
          getRadio('lofi')
        ]);
        if (cancelled) return;
        setConnected(!!status?.connected);
        setReco(r1.tracks || []);
        setRadio(r2.tracks || []);
      } catch (e) {
        // noop
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        {!connected && (
          <section className="glass" style={{padding:'1rem 1.25rem', borderRadius:18, display:'flex', alignItems:'center', justifyContent:'space-between', gap:'1rem'}}>
            <div className="muted">Connect Jamendo to enhance recommendations and radio.</div>
            <button className="btn-primary pill" onClick={async()=>{ const {authUrl} = await startJamendoOAuth(); if (authUrl) window.location.href = authUrl; }}>Connect Jamendo</button>
          </section>
        )}
        <section className="dashboard-header">
          <input className="dashboard-search" placeholder="Search for songs, artists, albums, users..." />
        </section>
        <section className="dashboard-featured">
          <div className="featured-playlist glass">
            <h2>Blinding Light</h2>
            <p>Enjoy vivid emotions with this stunning music album. Each track is a story.</p>
            <div className="playlist-meta">
              <span>93,012 likes</span>
              <span>18 Songs, 39 min 43 sec</span>
            </div>
          </div>
          <div className="now-playing glass">
            <h3>Now Playing</h3>
            <div className="now-playing-cover" />
            <div className="now-playing-info">
              <div>Snowfall</div>
              <div className="now-playing-artist">Oneheart</div>
            </div>
            <ul className="now-playing-list">
              <li>Therapy</li>
              <li>Apathy</li>
              <li>Look I'm here</li>
            </ul>
          </div>
        </section>
        <section className="glass" style={{padding:'1.2rem 1.5rem', borderRadius:18}}>
          <h3 className="section-title">Recommended for you</h3>
          {loading ? <div className="muted">Loading recommendations…</div> : (
            <div className="reco-grid">
              {reco.map(t => (
                <div key={t.id} className="reco-card">
                  <img src={t.cover} alt={t.title} />
                  <div className="rc-body">
                    <div className="rc-title">{t.title}</div>
                    <div className="rc-sub">{t.artist}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
        <section className="glass" style={{padding:'1.2rem 1.5rem', borderRadius:18}}>
          <h3 className="section-title">Radio • Lofi</h3>
          {loading ? <div className="muted">Tuning radio…</div> : (
            <div className="reco-grid">
              {radio.map(t => (
                <div key={t.id} className="reco-card">
                  <img src={t.cover} alt={t.title} />
                  <div className="rc-body">
                    <div className="rc-title">{t.title}</div>
                    <div className="rc-sub">{t.artist}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
        <section className="dashboard-artists glass">
          <h3>Popular artists</h3>
          <div className="artist-list">
            <div className="artist-avatar" />
            <div className="artist-avatar" />
            <div className="artist-avatar" />
            <div className="artist-avatar" />
            <div className="artist-avatar" />
          </div>
        </section>
        <section className="dashboard-recent glass">
          <h3>Recently played</h3>
          <ul>
            <li>Mr. Right Now - Metro Boomin</li>
            <li>Many Men - 21 Savage</li>
          </ul>
        </section>
      </main>
      <Player />
    </div>
  );
};

export default Dashboard;
