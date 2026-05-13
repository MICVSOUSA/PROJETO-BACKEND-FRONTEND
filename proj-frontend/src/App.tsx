import { Login } from './components/Login.tsx';
import { Register } from './components/Register.tsx';
import { Navbar } from './components/Navbar.tsx';
import { CriarThread } from './components/CriarThread.tsx';
import { CriarGrupo } from './components/CriarGrupo.tsx';
import { Biblioteca } from './components/Biblioteca.tsx';
import { GroupPage } from './components/Grupo.tsx';
import { useState } from 'react';

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [userId, setUserId] = useState<number | null>(() => {
    const stored = localStorage.getItem('userId');
    return stored ? Number(stored) : null;
  });

  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

  const handleSelectGroup = (id: number) => {
    setSelectedGroupId(id);
    setCurrentView('grupo');
  };

  const logout = async () => {
    if (token) {
      try {
        await fetch('http://localhost:3000/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (e) {
        console.error('Erro no logout via API');
      }
    }
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setToken(null);
    setUserId(null);
  };

  const handleLoginSuccess = (t: string) => {
    setToken(t);
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        {authView === 'login'
          ? <Login onLoginSuccess={handleLoginSuccess} />
          : <Register onBack={() => setAuthView('login')} />
        }

        <button
          className="mt-4 text-blue-600 underline"
          onClick={() => setAuthView(authView === 'login' ? 'register' : 'login')}
        >
          {authView === 'login'
            ? "Ainda não tem conta? Registe-se"
            : "Já tem conta? Faça Login"}
        </button>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Navbar setView={setCurrentView} currentView={currentView} onLogout={logout} />

      <div className="flex-1 p-6">
        {currentView === 'home' && <div>Home</div>}
        {currentView === 'perfil' && <div>Perfil</div>}
        {currentView === 'biblioteca' && <Biblioteca onSelectGroup={handleSelectGroup} />}
        {currentView === 'definicoes' && <div>Definições</div>}
        {currentView === 'grupo' && selectedGroupId && (
          <GroupPage groupId={selectedGroupId} onBack={() => setCurrentView('biblioteca')} />
        )}

        {currentView === 'criar-thread' && (<CriarThread onBack={() => setCurrentView("biblioteca")} />)}
        {currentView === 'criar-grupo' && (<CriarGrupo onBack={() => setCurrentView("biblioteca")} />)}
      </div>
    </div>
  );
}

export default App;
