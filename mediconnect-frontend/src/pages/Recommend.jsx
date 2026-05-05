import { useState } from 'react';
import { Stethoscope, Send, CheckCircle, AlertCircle, Lightbulb, ArrowRight } from 'lucide-react';
import { recommendSpecialist } from '../services/apiService';
import { Link } from 'react-router-dom';
import './Recommend.css';

const EXAMPLE_SYMPTOMS = [
  'chest pain and shortness of breath',
  'high fever and headache',
  'skin rash and itching',
  'knee pain and joint swelling',
  'stomach pain and nausea',
  'dizziness and migraine',
  'sore throat and ear pain',
  'blurred vision and eye pain',
  'anxiety and sleep disorder',
  'frequent urination and blood sugar',
];

const Recommend = () => {
  const [symptom, setSymptom] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!symptom.trim()) return;

    try {
      setLoading(true);
      setError(null);
      setResult(null);
      const res = await recommendSpecialist(symptom);
      setResult(res.data);
    } catch {
      setError('Failed to get recommendation. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleExample = (example) => {
    setSymptom(example);
    setResult(null);
    setError(null);
  };

  const getSpecialistIcon = (specialist) => {
    const icons = {
      Cardiologist: '❤️',
      Dermatologist: '🧴',
      Neurologist: '🧠',
      Orthopedic: '🦴',
      Gastroenterologist: '🫁',
      Pulmonologist: '🫁',
      'ENT Specialist': '👂',
      Ophthalmologist: '👁️',
      Psychiatrist: '🧘',
      Endocrinologist: '⚗️',
      Urologist: '🔬',
      Gynecologist: '🌸',
      Pediatrician: '👶',
      'General Physician': '🩺',
    };
    return icons[specialist] || '🩺';
  };

  return (
    <div className="recommend-page">
      <div className="recommend-container">
        {/* Header */}
        <div className="recommend-header">
          <div className="page-icon page-icon-purple" style={{ margin: '0 auto 16px' }}>
            <Stethoscope size={28} />
          </div>
          <h1 className="recommend-title">AI Specialist Finder</h1>
          <p className="recommend-subtitle">
            Describe your symptoms in plain language and our system will recommend
            the right specialist for you.
          </p>
        </div>

        {/* Form */}
        <div className="recommend-card">
          <form onSubmit={handleSubmit} className="recommend-form">
            <label className="form-label">
              Describe your symptoms
            </label>
            <textarea
              className="symptom-input"
              placeholder="e.g., I have been experiencing chest pain, shortness of breath, and heart palpitations for the past 2 days..."
              value={symptom}
              onChange={(e) => setSymptom(e.target.value)}
              rows={4}
            />
            <div className="form-footer">
              <span className="char-count">{symptom.length} characters</span>
              <button
                type="submit"
                className="submit-btn"
                disabled={loading || !symptom.trim()}
              >
                {loading ? (
                  <>
                    <div className="spinner" style={{ width: 18, height: 18 }}></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Get Recommendation
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Error */}
        {error && (
          <div className="recommend-error fade-in">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="result-card fade-in">
            <div className="result-header">
              <CheckCircle size={24} color="var(--green)" />
              <h2>Recommendation Ready</h2>
            </div>

            <div className="result-specialist">
              <span className="specialist-emoji">{getSpecialistIcon(result.specialist)}</span>
              <div>
                <div className="specialist-label">Recommended Specialist</div>
                <div className="specialist-name">{result.specialist}</div>
              </div>
              {result.score > 0 && (
                <div className="confidence-badge">
                  <span>Match Score: {result.score}</span>
                </div>
              )}
            </div>

            <div className="result-reason">
              <p>{result.reason}</p>
            </div>

            <div className="result-actions">
              <Link
                to={`/doctors?specialization=${encodeURIComponent(result.specialist)}`}
                className="result-action-btn"
              >
                Find {result.specialist}s in Kolhapur
                <ArrowRight size={16} />
              </Link>
              <button
                className="result-action-btn-secondary"
                onClick={() => { setResult(null); setSymptom(''); }}
              >
                Check Another Symptom
              </button>
            </div>
          </div>
        )}

        {/* Example Symptoms */}
        <div className="examples-section">
          <div className="examples-header">
            <Lightbulb size={18} color="var(--blue)" />
            <span>Try these example symptoms</span>
          </div>
          <div className="examples-grid">
            {EXAMPLE_SYMPTOMS.map((example, i) => (
              <button
                key={i}
                className="example-chip"
                onClick={() => handleExample(example)}
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="disclaimer">
          <AlertCircle size={16} />
          <p>
            <strong>Disclaimer:</strong> This tool provides general guidance only and is not a substitute
            for professional medical advice. Always consult a qualified healthcare provider for diagnosis and treatment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Recommend;
