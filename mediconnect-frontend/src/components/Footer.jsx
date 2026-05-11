import { Heart, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <Heart size={18} fill="white" color="white" />
              </div>
              <span>MediConnect</span>
            </div>
            <p className="footer-tagline">
              Connecting Kolhapur residents with quality healthcare services.
            </p>
            <div className="footer-contact">
              <div className="footer-contact-item">
                <MapPin size={14} />
                <span>Kolhapur, Maharashtra</span>
              </div>
              <div className="footer-contact-item">
                <Phone size={14} />
                <span>Emergency: 108</span>
              </div>
            </div>
          </div>

          <div className="footer-links-group">
            <h4>Services</h4>
            <ul>
              <li><Link to="/hospitals">Find Hospitals</Link></li>
              <li><Link to="/doctors">Find Doctors</Link></li>
              <li><Link to="/blood-bank">Blood Bank</Link></li>
              <li><Link to="/recommend">Specialist Finder</Link></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4>Specializations</h4>
            <ul>
              <li><Link to="/doctors?specialization=Cardiologist">Cardiologist</Link></li>
              <li><Link to="/doctors?specialization=Neurologist">Neurologist</Link></li>
              <li><Link to="/doctors?specialization=Orthopedic">Orthopedic</Link></li>
              <li><Link to="/doctors?specialization=General Physician">General Physician</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 MediConnect. Built for Kolhapur Healthcare.</p>
          <p className="footer-disclaimer">
            For emergencies, call 108. This platform is for informational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
