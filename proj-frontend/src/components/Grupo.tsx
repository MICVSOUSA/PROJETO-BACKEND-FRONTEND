import { useEffect, useState } from "react";

export const GroupPage = ({ groupId, onBack }: { groupId: number, onBack: () => void }) => {
  const [group, setGroup] = useState<any>(null);
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const loadData = async () => {
    const headers = { "Authorization": `Bearer ${token}` };
    try {
      const g = await fetch(`http://localhost:3000/api/groups/${groupId}`, { headers }).then(r => r.json());
      const e = await fetch(`http://localhost:3000/api/groups/${groupId}/entries`, { headers }).then(r => r.json());
      setGroup(g);
      setEntries(Array.isArray(e) ? e : []);
      setLoading(false);
    } catch (err) {
      console.error("Erro ao carregar dados", err);
    }
  };

  useEffect(() => {
    loadData();
  }, [groupId]);

  const handleDeleteEntry = async (entryId: number) => {
    if (!confirm("Tem a certeza que quer apagar esta memória?")) return;
    
    await fetch(`http://localhost:3000/api/entries/${entryId}`, {
      method: 'DELETE',
      headers: { "Authorization": `Bearer ${token}` }
    });
    
    //atualiza a lista localmente
    setEntries(entries.filter(e => e.id !== entryId));
  };

  const handleDeleteGroup = async () => {
    if (!confirm("CUIDADO: Isto vai apagar o grupo permanentemente. Continuar?")) return;
    
    await fetch(`http://localhost:3000/api/groups/${groupId}`, {
      method: 'DELETE',
      headers: { "Authorization": `Bearer ${token}` }
    });
    
    onBack(); //volta para a biblioteca
  };

  if (loading) return <div className="p-6">A carregar…</div>;

  return (
    <div className="p-6">
      <button onClick={onBack} className="mb-4 text-blue-600 underline">← Voltar</button>

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{group?.titulo}</h1>
        <button 
          onClick={handleDeleteGroup}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
        >
          Eliminar Grupo
        </button>
      </div>

      <div className="flex gap-2 mt-4">
        <button className="bg-slate-800 text-white px-4 py-2 rounded">Editar Grupo</button>
        <button 
          onClick={async () => {
            const res = await fetch(`http://localhost:3000/api/ai/groups/${groupId}/analyze`, { 
                method: 'POST',
                headers: { "Authorization": `Bearer ${token}` }
            });
            const themes = await res.json();
            alert("Análise: " + JSON.stringify(themes, null, 2));
          }}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Analisar Temas (IA)
        </button>
      </div>

      <h2 className="text-xl font-semibold mt-8">Memórias ({entries.length})</h2>

      <div className="mt-4 flex flex-col gap-4">
        {entries.map(e => (
          <div key={e.id} className="p-4 bg-white rounded shadow border border-gray-100 flex justify-between items-start">
            <div className="flex-1">
                <h3 className="font-bold text-lg">{e.title}</h3>
                <p className="text-gray-600 my-2">{e.body}</p>
                
                {e.mediaUrls && e.mediaUrls.length > 0 && (
                <div className="flex gap-2 flex-wrap mt-3">
                    {e.mediaUrls.map((url: string, idx: number) => (
                    <img 
                        key={idx} 
                        src={url.startsWith('http') ? url : `http://localhost:3000${url}`} 
                        className="w-24 h-24 object-cover rounded shadow-sm"
                        alt="Anexo"
                    />
                    ))}
                </div>
                )}
            </div>
            
            <button 
                onClick={() => handleDeleteEntry(e.id)}
                className="text-red-400 hover:text-red-600 font-medium ml-4"
            >
                Eliminar
            </button>
          </div>
        ))}
        {entries.length === 0 && <p className="text-gray-400 italic">Ainda não há memórias neste grupo.</p>}
      </div>
    </div>
  );
};
