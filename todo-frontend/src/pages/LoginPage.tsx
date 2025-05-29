import { useState } from 'react';
import { login } from '../api/auth';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }

    try {
      await login(email, password);
      alert('Login successful');
      window.location.href = '/';
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-green-300 font-mono p-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">TODO TERMINAL</h1>
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <input
          className="px-4 py-2 bg-black border border-green-700 rounded"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="px-4 py-2 bg-black border border-green-700 rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin} //
          className="bg-green-600 hover:bg-green-500 text-black font-bold px-4 py-2 rounded"
        >
          Login
        </button>

        <p className="text-sm text-green-500 mt-2 text-center">
          Don't have an account?{' '}
          <a href="/register" className="underline hover:text-green-300">Register</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
