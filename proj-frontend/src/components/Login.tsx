

export const Login = ({ onLoginSuccess }: { onLoginSuccess: (t: string) => void }) => {

  const handleInternalLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', String(data.user.id));
      onLoginSuccess(data.token);
    }
  };

  return (
    <div className="p-8 bg-white shadow-lg rounded-xl w-96">
      <form onSubmit={handleInternalLogin} className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          required
        />

        <button className="bg-slate-800 text-white p-2 rounded hover:bg-slate-900">
          Entrar
        </button>
      </form>
    </div>
  );
};
