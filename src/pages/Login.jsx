import React from 'react';

function Login() {
  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form className="space-y-4">
        <input className="w-full border p-2" placeholder="Email" type="email" />
        <input className="w-full border p-2" placeholder="Password" type="password" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
}

export default Login;
