import React, { useState, useEffect } from 'react';

export const CriarThread = ({ onBack }: { onBack: () => void }) => {
    const [groups, setGroups] = useState<any[]>([]);
    const [files, setFiles] = useState<FileList | null>(null);
    const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);

    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const loadGroups = async () => {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:3000/api/users/${userId}/groups`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                const data = await res.json();
                setGroups(data);
            } else {
                setGroups([]); // Evitar crash do .map se falhar
            }
        };
        loadGroups();
    }, []);

    //Adicionar tag manualmente
    const addTag = (tag: string) => {
        if (!tags.includes(tag)) {
            setTags([...tags, tag]);
        }
    };

    //Remover tag
    const removeTag = (tag: string) => {
        setTags(tags.filter(t => t !== tag));
    };

    //Pedir tags ao backend (OpenAI)  DEVE SER REVISTO QUANDO A MATILDE FIZER O BACKEND DO LLM!!!!!
    const handleSuggestTags = async () => {
        const token = localStorage.getItem("token");

        const title = (document.querySelector("input[name='title']") as HTMLInputElement)?.value;
        const body = (document.querySelector("textarea[name='body']") as HTMLTextAreaElement)?.value;

        if (!title) {
            alert("Escreve um título antes de pedir sugestões.");
            return;
        }

        if (!body) {
            alert("Escreve uma descrição antes de pedir sugestões.");
            return;
        }

        const res = await fetch("http://localhost:3000/api/entries/suggest-tags", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, body })
        });

        const data = await res.json();
        setSuggestedTags(data.tags || []);
    };

    //Criar Thread
    const handleCriarThread = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const formData = new FormData(e.currentTarget);
        formData.append("userId", String(userId));

        // Tags selecionadas
        tags.forEach(tag => formData.append("tags", tag));

        // Media
        if (files) {
            Array.from(files).forEach((file) => {
                formData.append("mediaUrls", file);
            });
        }

        const res = await fetch("http://localhost:3000/api/entries", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        });

        if (res.ok) {
            alert("Memória criada com sucesso");
            onBack();
        } else {
            const data = await res.json();
            alert(data.error || "Erro ao criar memória");
        }
    };

    return (
        <form
            onSubmit={handleCriarThread}
            className="p-8 bg-white shadow-lg rounded-xl flex flex-col gap-4 w-96"
        >
            <h2 className="text-2xl font-bold text-center">Criar Memória</h2>

            <input
                name="title"
                placeholder="Título"
                className="border p-2 rounded"
                required
            />

            <textarea
                name="body"
                placeholder="Texto da memória"
                className="border p-2 rounded"
            />

            <button
                type="button"
                onClick={handleSuggestTags}
                className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
            >
                Sugerir Tags (IA)
            </button>


            {suggestedTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {suggestedTags.map(tag => (
                        <span
                            key={tag}
                            onClick={() => addTag(tag)}
                            className="cursor-pointer bg-slate-200 px-2 py-1 rounded text-sm hover:bg-slate-300"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map(tag => (
                        <span
                            key={tag}
                            className="bg-blue-200 px-2 py-1 rounded text-sm flex items-center gap-1"
                        >
                            {tag}
                            <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="text-red-600 font-bold"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
            )}

            <select name="visibility" className="border p-2 rounded" required>
                <option value="public">Público</option>
                <option value="private">Privado</option>
            </select>

            <select name="groupId" className="border p-2 rounded" required>
                <option value="">Selecione um grupo</option>
                {groups.map((g) => (
                    <option key={g.id} value={g.id}>
                        {g.titulo}
                    </option>
                ))}
            </select>

            <label className="text-xs text-gray-500 font-bold">Media (opcional):</label>
            <input
                type="file"
                multiple
                onChange={(e) => setFiles(e.target.files)}
                className="text-sm"
            />

            <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                Criar
            </button>
        </form>
    );
};
