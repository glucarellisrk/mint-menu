// src/components/Admin.tsx
import { useEffect, useState } from "react";
import "./Admin.css";
import React from "react";

interface MenuItem {
  nombre: string;
  precio: number;
}
interface Menu {
  [categoria: string]: MenuItem[];
}

const API_URL = "https://mint-menu-production.up.railway.app/menu";

const Admin = () => {
  const [editedMenu, setEditedMenu] = useState<Menu>({});
  const [hasChanges, setHasChanges] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>(""); // <-- Nuevo estado
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data: Menu) => {
        setEditedMenu(data);
        // Simulamos 1s de espera para el spinner
        setTimeout(() => setLoading(false), 1000);
      })
      .catch((err) => {
        console.error("Error cargando el menú:", err);
        setLoading(false);
      });
  }, []);

  const actualizarPrecio = (categoria: string, index: number, nuevo: string) => {
    setEditedMenu((prev) => {
      const copia = { ...prev };
      if (Array.isArray(copia[categoria])) {
        copia[categoria][index].precio = parseFloat(nuevo);
        setHasChanges(true);
      }
      return copia;
    });
  };

  const guardarCambios = () => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedMenu),
    })
      .then((res) => {
        if (res.ok) {
          setHasChanges(false);
          alert("Guardado con éxito");
        } else {
          alert("Error al guardar");
        }
      })
      .catch(console.error);
  };

  // Filtramos las categorías según selección y luego los items por término de búsqueda
  const categoriasAMostrar = Object.keys(editedMenu)
    .filter((cat) => Array.isArray(editedMenu[cat]))
    .filter((cat) => (selectedMenu ? cat === selectedMenu : true));

  if (loading) {
    return (
      <div className="admin-spinner-container">
        <div className="admin-spinner"></div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <h2>Administración</h2>

      {/* Select de categorías */}
      <div className="admin-select-container">
        <label htmlFor="menu-select">Selecciona Menú:</label>
        <select
          id="menu-select"
          value={selectedMenu}
          onChange={(e) => setSelectedMenu(e.target.value)}
          className="admin-select"
        >
          <option value="">Todos</option>
          <option value="desayuno">Desayuno</option>
          <option value="almuerzo">Almuerzo</option>
          <option value="merienda">Merienda</option>
          <option value="cena">Cena</option>
        </select>
      </div>

      {/* Input de búsqueda */}
      <div className="admin-search-container">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          className="admin-search"
        />
      </div>

      {/* Mostrar categorías e ítems filtrados */}
      {categoriasAMostrar.map((categoria) => {
        const items = Array.isArray(editedMenu[categoria])
          ? editedMenu[categoria].filter((item) =>
              item.nombre.toLowerCase().includes(searchTerm)
            )
          : [];
        if (items.length === 0) return null;
        return (
          <div key={categoria} className="admin-category">
            <h3>{categoria.toUpperCase()}</h3>
            <ul>
              {items.map((item, i) => (
                <li key={i}>
                  <span>{item.nombre} – $</span>
                  <input
                    type="number"
                    value={item.precio}
                    onChange={(e) =>
                      actualizarPrecio(categoria, i, e.target.value)
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      {hasChanges && (
        <div className="admin-changes-alert">
          ¡Tienes cambios sin guardar!
        </div>
      )}

      <button
        className="admin-save-button"
        onClick={guardarCambios}
        disabled={!hasChanges}
      >
        Guardar Cambios
      </button>
    </div>
  );
};

export default Admin;
