import { portfolioData } from '../../store/portfolioData';
import './About.css';

export default function About({ onModalOpen }) {
  const { personal, drives } = portfolioData;

  return (
    <section id="about" className="about-section" aria-labelledby="about-title">
      <div className="container about-inner">
        <div className="about-left">
          <p className="eyebrow">About me</p>
          <h2 id="about-title">Building Meaningful Digital Experiences</h2>
          <p className="about-lead">{personal.bio}</p>
          <p className="about-body">{personal.bio2}</p>

          <div className="drive-title">What Drives Me</div>
          <div className="drive-cards" role="list">
            {drives.map(drive => (
              <button
                key={drive.key}
                className="drive-card"
                onClick={() => onModalOpen(drive.key)}
                aria-haspopup="dialog"
              >
                <h4>{drive.title}</h4>
                <p className="card-sub">{drive.subtitle}</p>
              </button>
            ))}
          </div>
        </div>

        <aside className="about-right" aria-hidden="false">
          <div className="about-image-frame">
            <img
              src={personal.profileImages.about}
              alt="Profile illustration"
              className="about-image"
            />
          </div>
        </aside>
      </div>
    </section>
  );
}
