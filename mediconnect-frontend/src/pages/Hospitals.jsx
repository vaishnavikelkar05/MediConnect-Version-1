import { useState, useEffect, useMemo } from 'react';
import { Search, MapPin, Phone, Building2, ChevronRight } from 'lucide-react';
import { getHospitals } from '../services/apiService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Link } from 'react-router-dom';
import './Hospitals.css';

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (search.trim() === '') {
      return hospitals;
    }

    const q = search.toLowerCase();
    return hospitals.filter(
      (h) =>
        h.name.toLowerCase().includes(q) ||
        (h.address && h.address.toLowerCase().includes(q))
    );
  }, [hospitals, search]);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getHospitals();
        setHospitals(res.data);
      } catch {
        setError('Failed to load hospitals. Please ensure the backend is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-content">
          <div className="page-icon page-icon-blue">
            <Building2 size={28} />
          </div>
          <div>
            <h1 className="page-title">Hospitals in Kolhapur</h1>
            <p className="page-subtitle">
              Find hospitals near you with contact details and location
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search hospitals by name or area..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          {search && (
            <button className="search-clear" onClick={() => setSearch('')}>
              x
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      {!loading && !error && (
        <div className="results-count">
          Showing {filtered.length} of {hospitals.length} hospitals
        </div>
      )}

      {/* Content */}
      {loading && <LoadingSpinner message="Loading hospitals..." />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <div className="cards-grid">
          {filtered.length === 0 ? (
            <div className="no-results">
              <Building2 size={48} color="var(--gray-300)" />
              <p>No hospitals found matching "{search}"</p>
            </div>
          ) : (
            filtered.map((hospital) => (
              <div key={hospital.id} className="hospital-card fade-in">
                <div className="hospital-card-header">
                  <div className="hospital-avatar">
                    {hospital.name.charAt(0)}
                  </div>
                  <div className="hospital-info">
                    <h3 className="hospital-name">{hospital.name}</h3>
                    <span className="hospital-id">ID: {hospital.id}</span>
                  </div>
                </div>

                <div className="hospital-details">
                  {hospital.address && (
                    <div className="detail-row">
                      <MapPin size={15} className="detail-icon" />
                      <span>{hospital.address}</span>
                    </div>
                  )}
                  {hospital.contact && (
                    <div className="detail-row">
                      <Phone size={15} className="detail-icon" />
                      <a href={`tel:${hospital.contact}`} className="detail-link">
                        {hospital.contact}
                      </a>
                    </div>
                  )}
                  {hospital.latitude && hospital.longitude && (
                    <div className="detail-row">
                      <MapPin size={15} className="detail-icon detail-icon-green" />
                      <a
                        href={`https://maps.google.com/?q=${hospital.latitude},${hospital.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="detail-link detail-link-green"
                      >
                        View on Google Maps
                      </a>
                    </div>
                  )}
                </div>

                <div className="hospital-card-footer">
                  <Link
                    to={`/doctors?hospitalId=${hospital.id}&hospitalName=${encodeURIComponent(hospital.name)}`}
                    className="card-action-btn"
                  >
                    View Doctors <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Hospitals;
