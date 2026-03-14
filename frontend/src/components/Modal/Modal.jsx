import { useState, useEffect } from 'react';
import { portfolioData } from '../../store/portfolioData';
import './Modal.css';

export default function InfoModal({ isOpen, tab, onClose }) {
  const { skills } = portfolioData;
  const [activeTab, setActiveTab] = useState(tab || 'languages');

  useEffect(() => {
    setActiveTab(tab || 'languages');
  }, [tab]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <div
      className={`info-modal ${isOpen ? 'visible' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      aria-labelledby="infoModalTitle"
      onClick={handleBackdropClick}
    >
      <div className="info-modal-panel" role="document">
        <button
          className="modal-close"
          aria-label="Close info"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="modal-head">
          <h3 id="infoModalTitle">Details</h3>
          <nav className="modal-tabs" role="tablist" aria-label="Info tabs">
            <button
              className={`tab-btn ${activeTab === 'languages' ? 'active' : ''}`}
              data-tab="languages"
              role="tab"
              aria-selected={activeTab === 'languages'}
              onClick={() => handleTabClick('languages')}
            >
              Languages
            </button>
            <button
              className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`}
              data-tab="education"
              role="tab"
              aria-selected={activeTab === 'education'}
              onClick={() => handleTabClick('education')}
            >
              Education
            </button>
            <button
              className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
              data-tab="projects"
              role="tab"
              aria-selected={activeTab === 'projects'}
              onClick={() => handleTabClick('projects')}
            >
              Projects
            </button>
          </nav>
        </div>

        <div className="modal-body">
          {activeTab === 'languages' && (
            <div className="tab-panel">
              <ul className="lang-list">
                {skills.languages.map((lang, idx) => (
                  <li key={idx}>{lang}</li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'education' && (
            <div className="tab-panel">
              {skills.education.map((edu, idx) => (
                <div key={idx} className="edu-item">
                  <h4>{edu.name}</h4>
                  <p>{edu.description}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="tab-panel">
              <ul className="project-list-modal">
                <li>
                  <a href="#projects" className="modal-project-link">
                    Portfolio Website — demo & repo
                  </a>
                </li>
                <li>
                  <a href="#projects" className="modal-project-link">
                    E‑Commerce UI — demo & repo
                  </a>
                </li>
                <li>
                  <a href="#projects" className="modal-project-link">
                    Weather Dashboard — demo & repo
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
