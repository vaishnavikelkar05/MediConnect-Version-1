import { useState, useEffect, useMemo } from 'react';
import { Droplets, Building2, Search } from 'lucide-react';
import { getBlood, getHospitals } from '../services/apiService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import './BloodBank.css';

const BLOOD_GROUPS = ['All', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

const BloodBank = () => {
  const [bloodData, setBloodData] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [selectedHospital, setSelectedHospital] = useState('');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let result = [...bloodData];

    if (selectedGroup !== 'All') {
      result = result.filter((b) => b.bloodGroup === selectedGroup);
    }

    if (selectedHospital) {
      result = result.filter(
        (b) => b.hospital && b.hospital.id === parseInt(selectedHospital)
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) => b.hospital && b.hospital.name.toLowerCase().includes(q)
      );
    }

    return result;
  }, [bloodData, search, selectedGroup, selectedHospital]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [bloodRes, hospitalsRes] = await Promise.all([
          getBlood(),
          getHospitals(),
        ]);
        setBloodData(bloodRes.data);
        setHospitals(hospitalsRes.data);
      } catch {
        setError('Failed to load blood bank data. Please ensure the backend is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getAvailabilityClass = (units) => {
    if (units >= 15) return 'high';
    if (units >= 5) return 'medium';
    return 'low';
  };

  const getAvailabilityLabel = (units) => {
    if (units >= 15) return 'High';
    if (units >= 5) return 'Medium';
    return 'Low';
  };

  // Group by hospital for summary view
  const hospitalSummary = hospitals.map((hospital) => {
    const hospitalBlood = bloodData.filter(
      (b) => b.hospital && b.hospital.id === hospital.id
    );
    return { hospital, bloodData: hospitalBlood };
  }).filter((h) => h.bloodData.length > 0);

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header-content">
          <div className="page-icon page-icon-red">
            <Droplets size={28} />
          </div>
          <div>
            <h1 className="page-title">Blood Bank</h1>
            <p className="page-subtitle">
              Check real-time blood availability across Kolhapur hospitals
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-row">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by hospital name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            {search && (
              <button className="search-clear" onClick={() => setSearch('')}>x</button>
            )}
          </div>

          <select
            value={selectedHospital}
            onChange={(e) => setSelectedHospital(e.target.value)}
            className="filter-select-plain"
          >
            <option value="">All Hospitals</option>
            {hospitals.map((h) => (
              <option key={h.id} value={h.id}>{h.name}</option>
            ))}
          </select>
        </div>

        {/* Blood Group Pills */}
        <div className="blood-group-pills">
          {BLOOD_GROUPS.map((group) => (
            <button
              key={group}
              className={`blood-pill ${selectedGroup === group ? 'active' : ''}`}
              onClick={() => setSelectedGroup(group)}
            >
              {group}
            </button>
          ))}
        </div>
      </div>

      {loading && <LoadingSpinner message="Loading blood bank data..." />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <>
          {/* Summary Cards */}
          {selectedGroup === 'All' && !selectedHospital && !search ? (
            <div className="blood-summary">
              {hospitalSummary.map(({ hospital, bloodData: hBlood }) => (
                <div key={hospital.id} className="blood-hospital-card fade-in">
                  <div className="blood-hospital-header">
                    <Building2 size={18} color="var(--blue)" />
                    <h3>{hospital.name}</h3>
                  </div>
                  <div className="blood-groups-grid">
                    {hBlood.map((b) => (
                      <div
                        key={b.id}
                        className={`blood-unit blood-unit-${getAvailabilityClass(b.unitsAvailable)}`}
                      >
                        <span className="blood-group-label">{b.bloodGroup}</span>
                        <span className="blood-units">{b.unitsAvailable}</span>
                        <span className="blood-units-label">units</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Filtered List View */
            <div>
              <div className="results-count">
                Showing {filtered.length} result{filtered.length !== 1 ? 's' : ''}
              </div>
              <div className="blood-list">
                {filtered.length === 0 ? (
                  <div className="no-results">
                    <Droplets size={48} color="var(--gray-300)" />
                    <p>No blood availability data found for your filters</p>
                  </div>
                ) : (
                  filtered.map((b) => (
                    <div key={b.id} className="blood-list-item fade-in">
                      <div className={`blood-group-badge blood-group-badge-${getAvailabilityClass(b.unitsAvailable)}`}>
                        {b.bloodGroup}
                      </div>
                      <div className="blood-list-info">
                        <div className="blood-hospital-name">
                          {b.hospital ? b.hospital.name : 'Unknown Hospital'}
                        </div>
                        <div className="blood-hospital-address">
                          {b.hospital ? b.hospital.address : ''}
                        </div>
                      </div>
                      <div className="blood-availability">
                        <span className={`availability-badge availability-${getAvailabilityClass(b.unitsAvailable)}`}>
                          {getAvailabilityLabel(b.unitsAvailable)}
                        </span>
                        <span className="units-count">{b.unitsAvailable} units</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BloodBank;
