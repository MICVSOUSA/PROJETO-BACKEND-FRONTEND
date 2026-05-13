import { useEffect, useState } from "react";

interface Comentario {
  id: number;
  body: string;
  userId: number;
  entryId: number;
  createdAt: string;
}

interface ComentariosProps {
  entryId: number;
}

export const Comentarios = ({ entryId }: ComentariosProps) => {
  const [comments, setComments] = useState<Comentario[]>([]);
  const [texto, setTexto] = useState("");
  const userId = localStorage.getItem("userId");

  const load = async () => {
    const res = await fetch(`http://localhost:3000/api/entries/${entryId}/comments`);
    const data = await res.json();
    setComments(data);
  };

  useEffect(() => {
    load();
  }, []);

  const enviar = async () => {
    await fetch(`http://localhost:3000/api/entries/${entryId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: texto, userId })
    });

    setTexto("");
    load();
  };

  return (
    <div className="mt-6">
      <h3 className="font-bold mb-2">Comentários</h3>

      <div className="flex gap-2">
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          className="border p-2 rounded flex-1"
          placeholder="Escreve um comentário…"
        />
        <button onClick={enviar} className="bg-blue-600 text-white px-3 rounded">
          Enviar
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {comments.map((c) => (
          <div key={c.id} className="bg-slate-100 p-3 rounded">
            <p className="text-sm">{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
