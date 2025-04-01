import React from "react";
import { useState, useEffect } from "react";

// Define la estructura del menú
interface MenuItem {
  nombre: string;
  precio: number;
}

interface Menu {
  [categoria: string]: MenuItem[];
}

const Admin = () => {
  const [menu, setMenu] = useState<Menu>({});
  const [editedMenu, setEditedMenu] = useState<Menu>({});

  useEffect(() => {
    fetch("/menu.json")
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
    fetch("http://localhost:5000/menu", {
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
    <div>
      <h2>Administración</h2>
      {Object.keys(editedMenu || {}).map((categoria) => (
        <div key={categoria}>
          <h3>{categoria.toUpperCase()}</h3>
          <ul>
            {editedMenu[categoria]?.map((item, index) => (
              <li key={index}>
                {item.nombre} - $
                <input
                  type="number"
                  value={item.precio}
                  onChange={(e) => actualizarPrecio(categoria, index, e.target.value)}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button onClick={guardarCambios}>Guardar Cambios</button>
    </div>
  );
};

export default Admin;
