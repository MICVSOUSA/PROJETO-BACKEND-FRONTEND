import React, { useState } from 'react';

export const Register = ({ onBack }: { onBack: () => void }) => {
    const [file, setFile] = useState<File | null>(null);
    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (file) formData.append('avatar', file);
        const res = await fetch('http://localhost:3000/api/users/register', { method: 'POST', body: formData });
        if (res.ok) {
            alert("Conta criada com sucesso"); //depois teremos que mudar para um pop up
            onBack();
        } else {
            const data = await res.json();
            if (data.errors) {
                alert(data.errors.join(' | '));
            } else {
                alert(data.message || 'Erro ao criar conta.');
            }

        }
    };
    return (
        <form onSubmit={handleRegister} className="p-8 bg-white shadow-lg
        rounded-xl flex flex-col gap-4 w-96">
            <h2 className="text-2xl font-bold text-center">Criar Conta</h2>
            <input name="fullName" placeholder="Nome Completo" className="border p-2
        rounded" required />
            <input name="email" type="email" placeholder="Email" className="border p-2
        rounded" required />
            <input name="password" type="password" placeholder="Password"
                className="border p-2 rounded" required />
            <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 font-bold">Avatar (Opcional):</label>
                <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="text-sm" />
            </div>
            <button className="bg-blue-600 text-white p-2 rounded
        hover:bg-blue-700">Registar</button>
        </form>
    );
};