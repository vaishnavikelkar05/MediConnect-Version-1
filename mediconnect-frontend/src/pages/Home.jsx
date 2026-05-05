import { Link } from 'react-router-dom';
import { Hospital, Users, Droplets, Stethoscope, ArrowRight, MapPin, Phone, Clock } from 'lucide-react';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: <Hospital size={28} />,
      title: 'Find Hospitals',
      description: 'Locate hospitals in Kolhapur with contact details and directions.',
      link: '/hospitals',
      color: 'blue',
    },
    {
      icon: <Users size={28} />,
      title: 'Find Doctors',
      description: 'Browse specialists and general physicians with availability and timings.',
      link: '/doctors',
      color: 'green',
    },
    {
      icon: <Droplets size={28} />,
      title: 'Blood Bank',
      description: 'Check real-time blood availability across Kolhapur hospitals.',
      link: '/blood-bank',
      color: 'red',
    },
    {
      icon: <Stethoscope size={28} />,
      title: 'AI Specialist Finder',
      description: 'Describe your symptoms and get an instant specialist recommendation.',
      link: '/recommend',
      color: 'purple',
    },
  ];

  const stats = [
    { value: '15+', label: 'Hospitals', icon: <Hospital size={20} /> },
    { value: '20+', label: 'Doctors', icon: <Users size={20} /> },
    { value: '8', label: 'Blood Groups', icon: <Droplets size={20} /> },
    { value: '14+', label: 'Specializations', icon: <Stethoscope size={20} /> },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <MapPin size={14} />
            <span>Serving Kolhapur, Maharashtra</span>
          </div>
          <h1 className="hero-title">
            Your Health,<br />
            <span className="hero-title-accent">Our Priority</span>
          </h1>
          <p className="hero-subtitle">
            MediConnect helps you find hospitals, doctors, blood availability, and
            get AI-powered specialist recommendations — all in one place.
          </p>
          <div className="hero-actions">
            <Link to="/recommend" className="btn-primary">
              <Stethoscope size={18} />
              Find a Specialist
            </Link>
            <Link to="/hospitals" className="btn-secondary">
              Browse Hospitals
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card">
            <div className="hero-card-header">
              <div className="pulse-dot"></div>
              <span>Live Health Network</span>
            </div>
            <div className="hero-stats-grid">
              {stats.map((stat, i) => (
                <div key={i} className="hero-stat">
                  <div className="hero-stat-icon">{stat.icon}</div>
                  <div className="hero-stat-value">{stat.value}</div>
                  <div className="hero-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Everything You Need</h2>
            <p className="section-subtitle">
              Comprehensive healthcare information for Kolhapur residents
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, i) => (
              <Link key={i} to={feature.link} className={`feature-card feature-card-${feature.color}`}>
                <div className={`feature-icon feature-icon-${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.description}</p>
                <div className="feature-link">
                  Explore <ArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Info Section */}
      <section className="quick-info-section">
        <div className="section-container">
          <div className="quick-info-grid">
            <div className="quick-info-card">
              <Phone size={24} color="var(--blue)" />
              <div>
                <h4>Emergency</h4>
                <p>Call 108 for ambulance services in Kolhapur</p>
              </div>
            </div>
            <div className="quick-info-card">
              <Clock size={24} color="var(--green)" />
              <div>
                <h4>24/7 Available</h4>
                <p>Several hospitals offer round-the-clock emergency care</p>
              </div>
            </div>
            <div className="quick-info-card">
              <MapPin size={24} color="var(--red)" />
              <div>
                <h4>Kolhapur Coverage</h4>
                <p>Covering all major hospitals across Kolhapur city</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="section-container">
          <div className="cta-card">
            <h2>Not sure which doctor to see?</h2>
            <p>Describe your symptoms and our AI will recommend the right specialist for you.</p>
            <Link to="/recommend" className="btn-primary">
              <Stethoscope size={18} />
              Try Symptom Checker
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
