import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Users, Clock, Building2, Stethoscope, Filter } from 'lucide-react';
import { getDoctors, getHospitals } from '../services/apiService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import './Doctors.css';

const SPECIALIZATIONS = [
  'All',
  'Cardiologist',
  'Dermatologist',
  'Neurologist',
  'Orthopedic',
  'Gastroenterologist',
  'Pulmonologist',
  'ENT Specialist',
  'Ophthalmologist',
  'Psychiatrist',
  'Endocrinologist',
  'Urologist',
  'Gynecologist',
  'Pediatrician',
  'General Physician',
];

const Doctors = () => {
  const [searchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('All');
  const [selectedHospital, setSelectedHospital] = useState('');

  const hospitalIdParam = searchParams.get('hospitalId');
  const hospitalNameParam = searchParams.get('hospitalName');
  const specializationParam = searchParams.get('specialization');

  const filtered = useMemo(() => {
    let result = [...doctors];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          (d.specialization && d.specialization.toLowerCase().includes(q))
      );
    }

    if (selectedSpec !== 'All') {
      result = result.filter(
        (d) => d.specialization && d.specialization.toLowerCase().includes(selectedSpec.toLowerCase())
      );
    }

    if (selectedHospital) {
      result = result.filter(
        (d) => d.hospital && d.hospital.id === parseInt(selectedHospital)
      );
    }

    return result;
  }, [doctors, search, selectedHospital, selectedSpec]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [doctorsRes, hospitalsRes] = await Promise.all([
          getDoctors(hospitalIdParam ? parseInt(hospitalIdParam) : null),
          getHospitals(),
        ]);
        setDoctors(doctorsRes.data);
        setHospitals(hospitalsRes.data);
        if (hospitalIdParam) {
          setSelectedHospital(hospitalIdParam);
        }
        if (specializationParam) {
          setSelectedSpec(decodeURIComponent(specializationParam));
        }
      } catch {
        setError('Failed to load doctors. Please ensure the backend is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [hospitalIdParam, specializationParam]);

  const getSpecColor = (spec) => {
    const colors = {
      Cardiologist: 'red',
      Dermatologist: 'orange',
      Neurologist: 'purple',
      Orthopedic: 'blue',
      Gastroenterologist: 'yellow',
      Pulmonologist: 'cyan',
      'ENT Specialist': 'teal',
      Ophthalmologist: 'indigo',
      Psychiatrist: 'violet',
      Endocrinologist: 'pink',
      Urologist: 'amber',
      Gynecologist: 'rose',
      Pediatrician: 'lime',
      'General Physician': 'green',
    };
    return colors[spec] || 'blue';
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header-content">
          <div className="page-icon page-icon-green">
            <Users size={28} />
          </div>
          <div>
            <h1 className="page-title">
              {hospitalNameParam ? `Doctors at ${decodeURIComponent(hospitalNameParam)}` : 'Find Doctors'}
            </h1>
            <p className="page-subtitle">
              Browse specialists and general physicians across Kolhapur
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-row">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search doctors by name or specialization..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            {search && (
              <button className="search-clear" onClick={() => setSearch('')}>x</button>
            )}
          </div>

          <div className="filter-group">
            <Filter size={16} className="filter-icon" />
            <select
              value={selectedHospital}
              onChange={(e) => setSelectedHospital(e.target.value)}
              className="filter-select"
            >
              <option value="">All Hospitals</option>
              {hospitals.map((h) => (
                <option key={h.id} value={h.id}>{h.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Specialization Pills */}
        <div className="spec-pills">
          {SPECIALIZATIONS.map((spec) => (
            <button
              key={spec}
              className={`spec-pill ${selectedSpec === spec ? 'active' : ''}`}
              onClick={() => setSelectedSpec(spec)}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {!loading && !error && (
        <div className="results-count">
          Showing {filtered.length} doctor{filtered.length !== 1 ? 's' : ''}
        </div>
      )}

      {loading && <LoadingSpinner message="Loading doctors..." />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <div className="cards-grid">
          {filtered.length === 0 ? (
            <div className="no-results">
              <Users size={48} color="var(--gray-300)" />
              <p>No doctors found matching your filters</p>
            </div>
          ) : (
            filtered.map((doctor) => (
              <div key={doctor.id} className="doctor-card fade-in">
                <div className="doctor-card-header">
                  <div className={`doctor-avatar doctor-avatar-${getSpecColor(doctor.specialization)}`}>
                    {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="doctor-info">
                    <h3 className="doctor-name">{doctor.name}</h3>
                    {doctor.specialization && (
                      <span className={`spec-badge spec-badge-${getSpecColor(doctor.specialization)}`}>
                        {doctor.specialization}
                      </span>
                    )}
                  </div>
                </div>

                <div className="doctor-details">
                  {doctor.hospital && (
                    <div className="detail-row">
                      <Building2 size={15} className="detail-icon" />
                      <span>{doctor.hospital.name}</span>
                    </div>
                  )}
                  {doctor.timings && (
                    <div className="detail-row">
                      <Clock size={15} className="detail-icon" />
                      <span>{doctor.timings}</span>
                    </div>
                  )}
                  {doctor.availability && (
                    <div className="detail-row">
                      <Stethoscope size={15} className="detail-icon" />
                      <span className="availability-text">{doctor.availability}</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Doctors;
