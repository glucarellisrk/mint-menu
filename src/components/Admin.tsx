import { useEffect, useState } from "react"
import "./Admin.css"
import React from "react";

// Define la estructura del menú
interface MenuItem {
  nombre: string;
  precio: number;
}

interface Menu {
  [categoria: string]: MenuItem[];
}

// URL del backend en Railway
const API_URL = "https://mint-menu-production.up.railway.app/menu";

const Admin = () => {
  const [menu, setMenu] = useState<Menu>({});
  const [editedMenu, setEditedMenu] = useState<Menu>({});

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data: Menu) => {
        setMenu(data);
        setEditedMenu(data);
      })
      .catch((error) => console.error("Error cargando el menú:", error));
  }, []);

  const actualizarPrecio = (categoria: string, index: number, nuevoPrecio: string) => {
    const nuevoMenu = { ...editedMenu };
    nuevoMenu[categoria][index].precio = parseFloat(nuevoPrecio);
    setEditedMenu(nuevoMenu);
  };

  const guardarCambios = () => {
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedMenu),
    })
      .then((res) => {
        if (res.ok) {
          alert("Cambios guardados en el servidor.");
        } else {
          alert("Error al guardar los cambios.");
        }
      })
      .catch((error) => console.error("Error al guardar los cambios:", error));
  };

  return (
    <div className="admin-container">
      <h2>Administración</h2>
      {Object.keys(editedMenu || {}).map((categoria) => {
        const items = editedMenu[categoria];
        if (!Array.isArray(items)) {
          return null;
        }
        if (categoria === "categories") {
          return null;
        }
        return (
          <div key={categoria} className="admin-category">
            <h3>{categoria.toUpperCase()}</h3>
            <ul>
              {items.map((item, index) => (
                <li key={index}>
                  <span>{item.nombre} - $</span>
                  <input
                    type="number"
                    value={item.precio}
                    onChange={(e) => actualizarPrecio(categoria, index, e.target.value)}
                  />
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      <button className="admin-save-button" onClick={guardarCambios}>
        Guardar Cambios
      </button>
    </div>
  );
};

export default Admin;
