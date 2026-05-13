import { useEffect, useState } from "react";
import { Comentarios } from "./Comentarios";
import { Reacoes } from "./Reacoes";

interface Tag {
  id: number;
  tag: {
    id: number;
    name: string;
  };
}

interface Entry {
  id: number;
  title: string;
  body: string;
  mediaUrls: string[];
  tags: Tag[];
  userId: number;
  groupId: number;
  createdAt: string;
}

interface VerThreadProps {
  entryId: number;
  onBack: () => void;
}

export const VerThread = ({ entryId, onBack }: VerThreadProps) => {
  const [entry, setEntry] = useState<Entry | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/entries/${entryId}`)
      .then((r) => r.json())
      .then((data) => setEntry(data));
  }, [entryId]);

  if (!entry) return <div>A carregar…</div>;

  return (
    <div className="p-6">
      <button onClick={onBack} className="text-blue-600 underline mb-4">
        Voltar
      </button>

      <h1 className="text-2xl font-bold">{entry.title}</h1>
      <p className="mt-2 text-gray-700">{entry.body}</p>

      {entry.mediaUrls?.length > 0 && (
        <div className="mt-4 flex gap-3 flex-wrap">
          {entry.mediaUrls.map((url: string) => (
            <img
              key={url}
              src={url}
              className="w-40 h-40 object-cover rounded"
            />
          ))}
        </div>
      )}

      {entry.tags?.length > 0 && (
        <div className="mt-4 flex gap-2 flex-wrap">
          {entry.tags.map((t: Tag) => (
            <span
              key={t.id}
              className="bg-slate-200 px-2 py-1 rounded text-sm"
            >
              {t.tag.name}
            </span>
          ))}
        </div>
      )}

      <Reacoes entryId={entryId} />

      <Comentarios entryId={entryId} />
    </div>
  );
};
