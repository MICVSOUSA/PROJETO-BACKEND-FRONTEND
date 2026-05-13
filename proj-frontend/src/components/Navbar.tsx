import { useState } from "react";

interface NavbarProps {
  setView: (view: string) => void;
  currentView: string;
  onLogout: () => void;
}

export const Navbar = ({ setView, currentView, onLogout }: NavbarProps) => {
  const [openSubmenu, setOpenSubmenu] = useState(false);

  const navItems = [
    { id: "perfil", label: "perfil" },
    { id: "home", label: "home" },
    { id: "criar", label: "criar" },
    { id: "biblioteca", label: "biblioteca" },
    { id: "definicoes", label: "definicoes" }
  ];

  const handleClick = (id: string) => {
    if (id === "criar") {
      setOpenSubmenu(!openSubmenu);
    } else {
      setOpenSubmenu(false);
      setView(id);
    }
  };

  return (
    <div className="relative">
      <nav className="h-screen w-40 bg-slate-900 text-white flex flex-col p-4 gap-4">
        <div className="flex-1 flex flex-col gap-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`p-3 rounded text-left transition ${
                currentView === item.id ? "bg-slate-700" : "hover:bg-slate-800"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={onLogout}
          className="p-3 rounded text-left bg-red-900/50 hover:bg-red-800 transition text-red-200 mt-auto"
        >
          sair / logout
        </button>
      </nav>

      {/* SUBMENU LATERAL */}
      {openSubmenu && (
        <div className="absolute left-40 top-[calc(2*3.5rem)] bg-slate-800 text-white p-3 rounded shadow-lg flex flex-col gap-2 w-40">
          <button
            onClick={() => {setView("criar-thread"); setOpenSubmenu(false)}}
            className="p-2 rounded hover:bg-slate-700 text-left"
          >
            Entrada
          </button>

          <button
            onClick={() => {setView("criar-grupo"); setOpenSubmenu(false)}}
            className="p-2 rounded hover:bg-slate-700 text-left"
          >
            Grupo
          </button>
        </div>
      )}
    </div>
  );
};
