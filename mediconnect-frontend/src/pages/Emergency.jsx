import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  Ambulance,
  Bed,
  Clock,
  HeartPulse,
  LocateFixed,
  MapPin,
  Radio,
  ShieldCheck,
  Siren,
  Stethoscope,
  WifiOff,
} from 'lucide-react';
import {
  bookEmergencyAppointment,
  getBedAvailability,
  getEmergencyRoute,
  recommendAmbulance,
  recommendEmergencyDoctor,
  syncOfflineEmergency,
  triageEmergency,
} from '../services/apiService';
import './Emergency.css';

const EMERGENCY_TYPES = [
  'Heart Attack',
  'Stroke',
  'Accident / Trauma',
  'Severe Bleeding',
  'Breathing Difficulty',
  'Burn Injury',
  'Poisoning',
  'Seizure',
  'Unconsciousness',
];

const OFFLINE_KEY = 'mediconnect_offline_emergency_request';

const initialForm = {
  patientName: '',
  patientPhone: '',
  emergencyType: 'Heart Attack',
  symptoms: '',
  severity: 'Severe',
  consciousnessState: 'Conscious',
  breathingCondition: 'Normal',
  bleedingLevel: 'None',
  manualLocation: '',
};

const Emergency = () => {
  const [activeTab, setActiveTab] = useState('appointment');
  const [form, setForm] = useState(initialForm);
  const [location, setLocation] = useState({ latitude: null, longitude: null, status: 'Detecting location...' });
  const [triage, setTriage] = useState(null);
  const [doctorResult, setDoctorResult] = useState(null);
  const [ambulanceResult, setAmbulanceResult] = useState(null);
  const [route, setRoute] = useState(null);
  const [beds, setBeds] = useState([]);
  const [loading, setLoading] = useState('');
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  const payload = useMemo(() => ({
    ...form,
    latitude: location.latitude || 16.705,
    longitude: location.longitude || 74.243,
  }), [form, location.latitude, location.longitude]);

  useEffect(() => {
    locateUser();
    loadBeds();
    const interval = setInterval(loadBeds, 30000);
    const onOnline = () => retryOfflineRequest();
    window.addEventListener('online', onOnline);
    return () => {
      clearInterval(interval);
      window.removeEventListener('online', onOnline);
    };
  }, []);

  const locateUser = () => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({ ...prev, status: 'Manual location fallback active' }));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          status: 'Live location captured',
        });
      },
      () => setLocation({ latitude: 16.705, longitude: 74.243, status: 'Manual fallback using Kolhapur center' }),
      { enableHighAccuracy: true, timeout: 7000 }
    );
  };

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const runTriage = async () => {
    const res = await triageEmergency(payload);
    setTriage(res.data);
    return res.data;
  };

  const submitAppointment = async () => {
    setError('');
    setNotice('');
    setLoading('appointment');
    try {
      const triageData = await runTriage();
      const res = await bookEmergencyAppointment(payload);
      setDoctorResult(res.data);
      setTriage(triageData);
      await loadRoute(res.data.hospital);
      setNotice('Emergency appointment created and priority queue assigned.');
      localStorage.removeItem(OFFLINE_KEY);
    } catch (err) {
      if (!navigator.onLine || err.code === 'ERR_NETWORK') {
        localStorage.setItem(OFFLINE_KEY, JSON.stringify(payload));
        setNotice('Emergency request saved offline. Retrying automatically...');
      } else {
        setError(err.response?.data?.message || 'Emergency appointment failed. Please try again.');
      }
    } finally {
      setLoading('');
    }
  };

  const previewDoctor = async () => {
    setError('');
    setLoading('doctor');
    try {
      const [triageRes, recommendRes] = await Promise.all([
        triageEmergency(payload),
        recommendEmergencyDoctor(payload),
      ]);
      setTriage(triageRes.data);
      setDoctorResult(recommendRes.data);
      await loadRoute(recommendRes.data.hospital);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not recommend a doctor.');
    } finally {
      setLoading('');
    }
  };

  const requestAmbulance = async () => {
    setError('');
    setLoading('ambulance');
    try {
      const res = await recommendAmbulance({
        latitude: payload.latitude,
        longitude: payload.longitude,
        emergencyType: payload.emergencyType,
        severityLevel: triage?.severityLevel || 'High',
      });
      setAmbulanceResult(res.data);
      await loadRoute(res.data.hospital);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not recommend an ambulance.');
    } finally {
      setLoading('');
    }
  };

  const loadRoute = async (hospital) => {
    if (!hospital) return;
    const res = await getEmergencyRoute({
      fromLat: payload.latitude,
      fromLng: payload.longitude,
      toLat: hospital.latitude,
      toLng: hospital.longitude,
    });
    setRoute(res.data);
  };

  const loadBeds = async () => {
    try {
      const res = await getBedAvailability();
      setBeds(res.data);
    } catch {
      setBeds([]);
    }
  };

  const retryOfflineRequest = async () => {
    const saved = localStorage.getItem(OFFLINE_KEY);
    if (!saved) return;
    setNotice('Connection restored. Retrying saved emergency request...');
    try {
      const res = await syncOfflineEmergency(JSON.parse(saved));
      setDoctorResult(res.data);
      localStorage.removeItem(OFFLINE_KEY);
      setNotice('Saved emergency request submitted successfully.');
    } catch {
      setNotice('Emergency request remains saved offline. Retrying automatically...');
    }
  };

  const bedStatus = (hospital) => {
    const total = (hospital.icuBedsAvailable || 0) + (hospital.generalBedsAvailable || 0) + (hospital.emergencyBedsAvailable || 0);
    if (total <= 3) return 'Full';
    if (total <= 12) return 'Limited';
    return 'Available';
  };

  return (
    <div className="emergency-page">
      <section className="emergency-header">
        <div>
          <span className="emergency-kicker"><Siren size={16} /> Emergency Intelligence</span>
          <h1>Emergency Healthcare Response</h1>
          <p>Priority appointments, ambulance matching, route simulation, and live simulated bed availability for critical care decisions.</p>
        </div>
        <div className="location-panel">
          <LocateFixed size={20} />
          <div>
            <strong>{location.status}</strong>
            <span>{location.latitude?.toFixed(4)}, {location.longitude?.toFixed(4)}</span>
          </div>
          <button type="button" onClick={locateUser}>Refresh</button>
        </div>
      </section>

      <div className="emergency-tabs" role="tablist">
        <button className={activeTab === 'appointment' ? 'active' : ''} onClick={() => setActiveTab('appointment')}><HeartPulse size={18} /> Emergency Appointment</button>
        <button className={activeTab === 'ambulance' ? 'active' : ''} onClick={() => setActiveTab('ambulance')}><Ambulance size={18} /> Emergency Ambulance</button>
        <button className={activeTab === 'beds' ? 'active' : ''} onClick={() => setActiveTab('beds')}><Bed size={18} /> Bed Availability</button>
      </div>

      {notice && <div className="emergency-notice"><Radio size={18} /> {notice}</div>}
      {error && <div className="emergency-error"><WifiOff size={18} /> {error}</div>}

      {activeTab !== 'beds' && (
        <section className="emergency-grid">
          <form className="emergency-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-title">
              <Activity size={20} />
              <h2>AI Triage Inputs</h2>
            </div>
            <div className="form-row">
              <label>Patient Name<input value={form.patientName} onChange={(e) => updateForm('patientName', e.target.value)} placeholder="Full name" /></label>
              <label>Phone<input value={form.patientPhone} onChange={(e) => updateForm('patientPhone', e.target.value)} placeholder="Emergency contact" /></label>
            </div>
            <label>Emergency Category<select value={form.emergencyType} onChange={(e) => updateForm('emergencyType', e.target.value)}>{EMERGENCY_TYPES.map((type) => <option key={type}>{type}</option>)}</select></label>
            <label>Symptoms<textarea value={form.symptoms} onChange={(e) => updateForm('symptoms', e.target.value)} placeholder="Chest pain, dizziness, breathing issue..." /></label>
            <div className="form-row">
              <label>Severity<select value={form.severity} onChange={(e) => updateForm('severity', e.target.value)}><option>Mild</option><option>Moderate</option><option>Severe</option></select></label>
              <label>Consciousness<select value={form.consciousnessState} onChange={(e) => updateForm('consciousnessState', e.target.value)}><option>Conscious</option><option>Drowsy</option><option>Unconscious</option></select></label>
            </div>
            <div className="form-row">
              <label>Breathing<select value={form.breathingCondition} onChange={(e) => updateForm('breathingCondition', e.target.value)}><option>Normal</option><option>Difficulty</option><option>Severe Difficulty</option><option>Not Breathing</option></select></label>
              <label>Bleeding<select value={form.bleedingLevel} onChange={(e) => updateForm('bleedingLevel', e.target.value)}><option>None</option><option>Moderate</option><option>Severe</option><option>Uncontrolled</option></select></label>
            </div>
            <label>Manual Location Fallback<input value={form.manualLocation} onChange={(e) => updateForm('manualLocation', e.target.value)} placeholder="Area, landmark, or address" /></label>
            <div className="action-row">
              <button type="button" onClick={previewDoctor} disabled={!!loading}>{loading === 'doctor' ? 'Searching...' : 'Find Best Doctor'}</button>
              <button type="button" className="danger" onClick={submitAppointment} disabled={!!loading}>{loading === 'appointment' ? 'Booking...' : 'Book Emergency'}</button>
            </div>
          </form>

          <aside className="result-stack">
            {triage && <TriageCard triage={triage} />}
            {activeTab === 'appointment' && doctorResult && <DoctorCard result={doctorResult} />}
            {activeTab === 'ambulance' && (
              <>
                <button className="wide-danger" onClick={requestAmbulance} disabled={!!loading}>{loading === 'ambulance' ? 'Searching ambulance...' : 'Recommend Ambulance'}</button>
                {ambulanceResult && <AmbulanceCard result={ambulanceResult} />}
              </>
            )}
            {route && <RouteCard route={route} />}
          </aside>
        </section>
      )}

      {activeTab === 'beds' && (
        <section className="bed-section">
          <div className="bed-header">
            <div>
              <h2>Simulated Dynamic Bed Availability</h2>
              <p>Auto-refreshes every 30 seconds on the frontend. Backend updates counts every 60 seconds.</p>
            </div>
            <button onClick={loadBeds}>Refresh</button>
          </div>
          <div className="bed-grid">
            {beds.map((hospital) => (
              <div className="bed-card" key={hospital.id}>
                <div className="bed-card-head">
                  <h3>{hospital.name}</h3>
                  <span className={`status ${bedStatus(hospital).toLowerCase()}`}>{bedStatus(hospital)}</span>
                </div>
                <div className="bed-metrics">
                  <Metric label="ICU Beds" value={hospital.icuBedsAvailable} />
                  <Metric label="General Beds" value={hospital.generalBedsAvailable} />
                  <Metric label="Emergency Beds" value={hospital.emergencyBedsAvailable} />
                  <Metric label="Trauma Beds" value={hospital.traumaBedsAvailable} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

const TriageCard = ({ triage }) => (
  <div className={`emergency-card severity-${triage.severityLevel.toLowerCase()}`}>
    <div className="card-heading"><ShieldCheck size={19} /><h3>{triage.severityLevel} Priority</h3></div>
    <p>Priority score: <strong>{triage.priorityScore}</strong></p>
    <p>{triage.prioritizeIcu ? 'ICU-capable hospitals prioritized.' : 'Standard emergency capability is acceptable.'}</p>
    <ul>{triage.reasons.map((reason) => <li key={reason}>{reason}</li>)}</ul>
  </div>
);

const DoctorCard = ({ result }) => (
  <div className="emergency-card">
    <div className="card-heading"><Stethoscope size={19} /><h3>{result.doctor.name}</h3></div>
    <div className="score-strip">
      <span>{result.mappedSpecialization}</span>
      <span>{result.etaMinutes} min ETA</span>
      <span>{result.score} score</span>
    </div>
    <p>{result.hospital.name}</p>
    <ul>{result.selectedBecause.map((reason) => <li key={reason}>{reason}</li>)}</ul>
    {result.appointment && <div className="queue-badge">Queue Priority: {result.appointment.queuePriority}</div>}
  </div>
);

const AmbulanceCard = ({ result }) => (
  <div className="emergency-card">
    <div className="card-heading"><Ambulance size={19} /><h3>{result.ambulance.ambulanceType}</h3></div>
    <div className="score-strip">
      <span>{result.etaMinutes} min ETA</span>
      <span>{result.distanceKm} km</span>
      <span>{result.score} score</span>
    </div>
    <p>Driver: {result.ambulance.driverName}</p>
    <ul>{result.selectedBecause.map((reason) => <li key={reason}>{reason}</li>)}</ul>
  </div>
);

const RouteCard = ({ route }) => (
  <div className="emergency-card route-card">
    <div className="card-heading"><MapPin size={19} /><h3>Emergency Route</h3></div>
    <div className="route-visual"><div className="route-line" /><div className="route-dot start" /><div className="route-dot end" /></div>
    <div className="score-strip">
      <span>{route.etaMinutes} min</span>
      <span>{route.distanceKm} km</span>
      <span>{route.trafficCondition} traffic</span>
    </div>
    <p>{route.fastestRoute}</p>
    <ul>{route.alternateRoutes.map((routeName) => <li key={routeName}>{routeName}</li>)}</ul>
  </div>
);

const Metric = ({ label, value }) => (
  <div className="metric">
    <span>{label}</span>
    <strong>{value ?? 0}</strong>
  </div>
);

export default Emergency;
