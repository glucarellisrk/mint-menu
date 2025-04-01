import React from "react";
import { useEffect, useState } from "react";

const obtenerHorario = () => {
  const hora = new Date().getHours();
  if (hora >= 6 && hora < 12) return "desayuno";
  if (hora >= 12 && hora < 17) return "almuerzo";
  if (hora >= 17 && hora < 20) return "merienda";
  return "cena";
};

interface MenuItem {
  nombre: string;
  precio: number;
}

const Menu = () => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const horario = obtenerHorario();

  useEffect(() => {
    fetch("./menu.json")
      .then((res) => res.json())
      .then((data) => setMenu(data[horario]))
      .catch((error) => console.error("Error cargando el menú:", error));
  }, [horario]);

  return (
    <div>
      <h2>Menú de {horario}</h2>
      <ul>
        {menu.map((item, index) => (
          <li key={index}>
            {item.nombre} - ${item.precio}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
