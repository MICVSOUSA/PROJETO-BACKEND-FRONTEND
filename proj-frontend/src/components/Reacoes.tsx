import { useEffect, useState } from "react";

interface Reaction {
  id: number;
  userId: number;
  entryId: number;
  type: string;
  createdAt: string;
}

interface ReacoesProps {
  entryId: number;
}

export const Reacoes = ({ entryId }: ReacoesProps) => {
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const userId = Number(localStorage.getItem("userId"));

  const load = async () => {
    const res = await fetch(`http://localhost:3000/api/entries/${entryId}/reactions`);
    const data = await res.json();
    setReactions(data);
  };

  useEffect(() => {
    load();
  }, []);

  const toggle = async () => {
    const hasReacted = reactions.some((r) => r.userId === userId);

    if (hasReacted) {
      await fetch(`http://localhost:3000/api/entries/${entryId}/reactions`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId })
      });
    } else {
      await fetch(`http://localhost:3000/api/entries/${entryId}/reactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, type: "LIKE" })
      });
    }

    load();
  };

  return (
    <div className="mt-4 flex items-center gap-3">
      <button onClick={toggle} className="text-2xl">
        ❤️
      </button>
      <span>{reactions.length} gostos</span>
    </div>
  );
};
