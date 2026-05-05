import { AlertCircle } from 'lucide-react';
import './ErrorMessage.css';

const ErrorMessage = ({ message = 'Something went wrong. Please try again.' }) => {
  return (
    <div className="error-container">
      <AlertCircle size={40} color="var(--red)" />
      <p className="error-text">{message}</p>
      <p className="error-hint">Make sure the backend server is running on port 8080.</p>
    </div>
  );
};

export default ErrorMessage;
