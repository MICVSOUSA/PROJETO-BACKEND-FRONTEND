import React, { useState } from 'react';

export const CriarGrupo = ({ onBack }: { onBack: () => void }) => {
    const [file, setFile] = useState<File | null>(null);
    const handleCriarGrupo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const formData = new FormData(e.currentTarget);
        if (file) {
            formData.append("coverImage", file);
        }
        const res = await fetch("http://localhost:3000/api/groups", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: formData,
        });
        if (res.ok) {
            alert("Grupo criado com sucesso"); //depois teremos que mudar para um pop up
            onBack();
        } else {
            const data = await res.json();
            if (data.errors) {
                alert(data.errors.join(' | '));
            } else {
                alert(data.message || 'Erro ao criar grupo.');
            }
        }
    };
    return (
        <form onSubmit={handleCriarGrupo} className="p-8 bg-white shadow-lg
        rounded-xl flex flex-col gap-4 w-96">
            <h2 className="text-2xl font-bold text-center">Criar Grupo</h2>
            <input name="titulo" placeholder="Título" className="border p-2
        rounded" required />
            <input name="description" placeholder="Descrição" className="border p-2
        rounded"/>
            <select name="privacy" className="border p-2 rounded" required>
                <option value="PUBLIC">Público</option>
                <option value="PRIVATE">Privado</option>
            </select>
            <label className="text-xs text-gray-500 font-bold">Capa (Opcional):</label>
            <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="text-sm" />

            <button className="bg-blue-600 text-white p-2 rounded
        hover:bg-blue-700">Criar</button>
        </form>
    );
}