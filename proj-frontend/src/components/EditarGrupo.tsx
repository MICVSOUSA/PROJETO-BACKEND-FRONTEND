import { useState } from "react";

interface Grupo {
  id: number;
  titulo: string;
  description?: string | null;
  privacy: "PUBLIC" | "PRIVATE";
  coverImage?: string | null;
}

interface EditarGrupoProps {
  group: Grupo;
  onBack: () => void;
  onUpdated: () => void;
}

export const EditarGrupo = ({ group, onBack, onUpdated }: EditarGrupoProps) => {
  const [titulo, setTitulo] = useState(group.titulo);
  const [description, setDescription] = useState(group.description || "");
  const [privacy, setPrivacy] = useState<"PUBLIC" | "PRIVATE">(group.privacy);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("description", description);
    formData.append("privacy", privacy);

    if (file) formData.append("coverImage", file);

    const res = await fetch(`http://localhost:3000/api/groups/${group.id}`, {
      method: "PATCH",
      body: formData
    });

    if (res.ok) {
      alert("Grupo atualizado!");
      onUpdated();
    } else {
      alert("Erro ao atualizar grupo");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-xl shadow flex flex-col gap-4 w-96"
    >
      <h2 className="text-xl font-bold">Editar Grupo</h2>

      <input
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="border p-2 rounded"
        placeholder="Título"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded"
        placeholder="Descrição"
      />

      <select
        value={privacy}
        onChange={(e) => setPrivacy(e.target.value as "PUBLIC" | "PRIVATE")}
        className="border p-2 rounded"
      >
        <option value="PUBLIC">Público</option>
        <option value="PRIVATE">Privado</option>
      </select>

      <label className="text-sm text-gray-500">Nova capa (opcional)</label>

      <input
        type="file"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
          }
        }}
      />

      <button className="bg-blue-600 text-white p-2 rounded">Guardar</button>
      <button
        type="button"
        onClick={onBack}
        className="text-blue-600 underline"
      >
        Cancelar
      </button>
    </form>
  );
};
