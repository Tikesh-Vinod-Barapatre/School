import React from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp } from 'react-icons/fa';
import './Player.css';

const Player = () => (
  <footer className="player glass">
    <div className="player-track">
      <img className="player-cover" alt="cover" />
      <div className="player-info">
        <div className="player-title">Oneheart - Snowfall</div>
        <div className="player-time">03:12</div>
      </div>
    </div>
    <div className="player-controls">
      <button><FaStepBackward /></button>
      <button><FaPlay /></button>
      <button><FaStepForward /></button>
    </div>
    <div className="player-extra">
      <FaVolumeUp />
      <div className="player-waveform">
        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
      </div>
    </div>
  </footer>
);

export default Player;
