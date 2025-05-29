import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/auth';

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
      try {
        await register(email, password);

        setSuccessMessage('🎉 Registration successful! Redirecting...');
        setError('');

        setTimeout(() => {
          navigate('/');
        }, 1500);
      } catch (err: any) {
        setError(err.message);
        setSuccessMessage('');
      }
    };

  return (
    <div className="min-h-screen bg-gray-900 text-green-300 font-mono flex items-center justify-center">
      <div className="w-full max-w-sm bg-black p-6 rounded border border-green-700">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && <div className="text-red-400 text-sm mb-2">{error}</div>}
        {successMessage && <div className="text-green-400 text-sm mb-2">{successMessage}</div>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-3 bg-gray-800 border border-green-700 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-3 bg-gray-800 border border-green-700 rounded"
        />
        <button
          onClick={handleRegister}
          className="w-full bg-green-600 hover:bg-green-500 text-black font-bold py-2 px-4 rounded"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;
