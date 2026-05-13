import { useState, useEffect, useCallback } from "react";

interface Grupo {
  id: number;
  titulo: string;
  coverImage: string | null;
}

export const Biblioteca = ({ onSelectGroup }: { onSelectGroup: (id: number) => void }) => {
  const [error, setError] = useState<string | null>(null);
  const [groups, setGroups] = useState<Grupo[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  const fetchGroups = useCallback(() => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/api/users/${userId}/groups`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Erro ${res.status}`);
        return res.json();
      })
      .then((data: Grupo[]) => {
        setGroups(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  if (loading)
    return (
      <div className="text-center animate-pulse py-20">
        A carregar grupos…
      </div>
    );

  if (error)
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 p-6 rounded-lg text-center">
        <p className="font-semibold mb-2">Falha ao carregar grupos</p>
        <p className="text-sm mb-4">{error}</p>

        <button
          onClick={fetchGroups}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Tentar Novamente
        </button>
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {groups.map((g) => (
        <div
          key={g.id}
          onClick={() => onSelectGroup(g.id)}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200
          hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
        >
          {/* TÍTULO */}
          <h3 className="text-base font-bold text-slate-800">{g.titulo}</h3>

          {/* CAPA */}
          {g.coverImage && (
            <img
              src={g.coverImage.startsWith('/') ? `http://localhost:3000${g.coverImage}` : g.coverImage}
              alt="Capa do grupo"
              className="mt-3 rounded-lg w-full h-32 object-cover"
            />
          )}

          {/* Se não tiver capa */}
          {!g.coverImage && (
            <div className="mt-3 w-full h-32 bg-slate-200 rounded-lg flex items-center justify-center text-slate-500">
              Sem capa
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
