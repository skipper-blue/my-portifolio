import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container center">
        <p className="footer-text">© {currentYear} · Skipper-blue · All Rights Reserved</p>
      </div>
    </footer>
  );
}
