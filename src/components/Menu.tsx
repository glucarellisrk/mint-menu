"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Clock, Coffee, UtensilsCrossed, Sun, Sandwich, Moon } from "lucide-react"
import "./../App.css"
import React from "react"

// API URL from Railway
const API_URL = "https://mint-menu-production.up.railway.app/menu"

// Function to determine current time period
const obtenerHorario = () => {
  const hora = new Date().getHours()
  if (hora >= 6 && hora < 12) return "desayuno"
  if (hora >= 12 && hora < 17) return "almuerzo"
  if (hora >= 17 && hora < 20) return "merienda"
  return "cena"
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
}

function App() {
  const [menuData, setMenuData] = useState<Record<string, { nombre: string; precio: number }[]> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState(obtenerHorario())
  const horario = obtenerHorario()

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true)
        const res = await fetch(API_URL)
        if (!res.ok) {
          throw new Error("Failed to fetch menu data")
        }
        const data = await res.json()
        setMenuData(data)
      } catch (error) {
        console.error("Error loading menu:", error)
        setError("No pudimos cargar el menú. Por favor, intente nuevamente más tarde.")
      } finally {
        setLoading(false)
      }
    }
    fetchMenu()
  }, [])


  // Categories from the menu image
  const categories = {
    cafeteria: [
      "Pocillo",
      "Jarrito",
      "Doble",
      "Mug",
      "Te saborizados",
      "Submarino",
      "Capuchino",
      "Latte",
      "Mocca",
      "Frapuccino",
    ],
    miscelaneas: ["Tortilla", "Tostadas", "Untables", "Cazuela de Palta", "Medialuna", "Medialuna rellena con J y Q"],
    algoDulce: ["Muffins", "Donna", "Chocotorta", "Lemon Pie", "Alfajor", "Cheesecake", "Alfajor gluten free"],
    combos: [
      "CLÁSICO",
      "CORTITO",
      "MAFALDA",
      "TOSTADAS",
      "PROTEICO",
      "FIT",
      "AVOCADO TOAST",
      "BONAERENSE",
      "TABLA PARA COMPARTIR",
    ],
    brunch: [
      "Avocado Toast",
      "Huevo revuelto con panceta",
      "Omelette jamón y queso",
      "Tostado de jamón y queso",
      "Waffles con mantequilla de maní",
      "Waffles con Nutella",
      "Waffle con helado",
      "Copa Mint",
    ],
    principales: [
      "Lomo al Champiñon",
      "Lomo Grillado",
      "Pechuga Grillada",
      "Pollo al puerro",
      "Milanesa Clásica",
      "Milanesa napolitana",
      "Milanesa Mint",
      "Wok de vegetales",
      "Tallarines",
      "Sorrentinos de Jamón y queso",
      "Tacos Carne / pollo",
      "Quesadillas",
    ],
    bebidas: [
      "Licuados",
      "Jugo de Naranja",
      "Limonada",
      "Limonada Mint",
      "Agua con/sin gas",
      "Agua Tónica",
      "Aquarius",
      "Línea coca cola",
      "Heineken",
      "Imperial",
      "Corona",
    ],
  }

  // Function to filter menu items by category
  const filterByCategory = (items, categoryItems) => {
    return items.filter(item => {
      const itemNombre = item.nombre.toLowerCase()
      return categoryItems.some(categoryItem => itemNombre.includes(categoryItem.toLowerCase()))
    })
  }


  // Mapeo de íconos por categoría
  const categoryIcons = {
    cafeteria: <Coffee className="h-6 w-6" />,
    miscelaneas: <Sandwich className="h-6 w-6" />,
    algoDulce: <Moon className="h-6 w-6" />,
    combos: <UtensilsCrossed className="h-6 w-6" />,
    brunch: <Sun className="h-6 w-6" />,
    principales: <UtensilsCrossed className="h-6 w-6" />,
    bebidas: <Clock className="h-6 w-6" />,
  }

  return (
    <div className="min-h-screen bg-mint-secondary">
      {/* Header */}
      <motion.header
        className="bg-mint-primary text-mint-text py-6 shadow-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Mint Restaurant</h1>
            <div className="flex items-center gap-2 bg-mint-secondary px-3 py-1 rounded-full ml-auto">
              <Clock className="h-5 w-5" />
              <span className="ml-2 capitalize">{horario}</span>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mint-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4">{error}</div>
        ) : (
          <>
            {/* Tabs */}
            <div className="w-full mb-8">
              <div className="grid w-full grid-cols-4 bg-mint-primary-light rounded-lg overflow-hidden">
                <TabButton
                  active={activeTab === "desayuno"}
                  onClick={() => setActiveTab("desayuno")}
                  icon={<Sun className="h-4 w-4 mr-2" />}
                  label="Desayuno"
                />
                <TabButton
                  active={activeTab === "almuerzo"}
                  onClick={() => setActiveTab("almuerzo")}
                  icon={<UtensilsCrossed className="h-4 w-4 mr-2" />}
                  label="Almuerzo"
                />
                <TabButton
                  active={activeTab === "merienda"}
                  onClick={() => setActiveTab("merienda")}
                  icon={<Sandwich className="h-4 w-4 mr-2" />}
                  label="Merienda"
                />
                <TabButton
                  active={activeTab === "cena"}
                  onClick={() => setActiveTab("cena")}
                  icon={<Moon className="h-4 w-4 mr-2" />}
                  label="Cena"
                />
              </div>
            </div>

            {/* Tab Content */}
            {menuData &&
              Object.entries(menuData || {}).map(([time, items]: [string, { nombre: string; precio: number }[]]) => {
                if (time !== activeTab) return null

                return (
                  <div key={time} className="space-y-8">
                    {/* Cafetería Section */}
                    {(time === "desayuno" || time === "merienda") && (
                      <MenuSection
                        title="Cafetería"
                        icon={categoryIcons.cafeteria}
                        items={filterByCategory(items, categories.cafeteria)}
                      />
                    )}

                    {/* Combos Section */}
                    {(time === "desayuno" || time === "merienda") && (
                      <MenuSection
                        title="Combos"
                        icon={categoryIcons.combos}
                        items={filterByCategory(items, categories.combos)}
                      />
                    )}

                    {/* Misceláneas Section */}
                    {(time === "desayuno" || time === "merienda") && (
                      <MenuSection
                      title="Misceláneas"
                      icon={categoryIcons.miscelaneas}
                      items={filterByCategory(items, categories.miscelaneas)}
                      />
                    )}

                    {/* Brunch Section */}
                    {(time === "desayuno" || time === "almuerzo") && (
                      <MenuSection
                        title="Brunch"
                        icon={categoryIcons.brunch}
                        items={filterByCategory(items, categories.brunch)}
                      />
                    )}

                    {/* Principales Section */}
                    {(time === "almuerzo" || time === "cena") && (
                      <MenuSection
                        title="Platos Principales"
                        icon={categoryIcons.principales}
                        items={filterByCategory(items, categories.principales)}
                      />
                    )}

                    {/* Bebidas Section - Show in all menus */}
                    <MenuSection
                      title="Bebidas"
                      icon={categoryIcons.bebidas}
                      items={filterByCategory(items, categories.bebidas)}
                    />

                    {/* All other items */}
                    <MenuSection
                      title="Otros"
                      icon={categoryIcons.miscelaneas}
                      items={items.filter(
                        (item) =>
                          !Object.values(categories)
                            .flat()
                            .some((categoryItem) => item.nombre.toLowerCase().includes(categoryItem.toLowerCase())),
                      )}
                    />
                  </div>
                )
              })}
          </>
        )}
      </main>

      {/* Footer */}
      <motion.footer
        className="bg-mint-primary text-mint-text py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="container mx-auto px-4 text-center">
          <p>mint_loungebar | mint salta | +54 3873 00-9494</p>
        </div>
      </motion.footer>
    </div>
  )
}

// Tab Button Component
function TabButton({ active, onClick, icon, label }) {
  return (
    <button
      className={`flex items-center justify-center py-2 px-4 transition-all duration-300 ${active ? "bg-mint-primary text-mint-text" : "text-mint-text-light hover:bg-mint-primary-hover"
        }`}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  )
}

// Menu Section Component
function MenuSection({ title, icon, items }) {
  if (items.length === 0) return null

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <div className="card overflow-hidden border border-mint-primary-border shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="card-header bg-mint-primary-light">
          <div className="flex items-center gap-2 text-mint-text font-bold text-xl p-4">
            {icon}
            {title}
          </div>
          <div className="text-mint-text-light text-sm px-4 pb-4">
            {items.length} {items.length === 1 ? "item" : "items"}
          </div>
        </div>
        <div className="card-content pt-6 bg-white p-4">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" variants={containerVariants}>
            {items.map((item, index) => (
              <motion.div
                key={index}
                className="border-b border-mint-primary-border pb-2 hover:bg-mint-secondary p-2 rounded transition-colors duration-200"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium flex-1">{item.nombre}</span>
                  <span className="font-bold text-mint-primary ml-auto">${item.precio}</span>
                </div>
                {item.descripcion && (
                  <p className="text-sm text-mint-text-light mt-1">{item.descripcion}</p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}


function AdminPanel({ editedMenu, actualizarPrecio, guardarCambios }) {
  return (
    <div>
      <h2>Administración</h2>
      {Object.keys(editedMenu || {}).map((categoria) => {
        const items = editedMenu[categoria];

        // Manejar las subcategorías dentro de "categories"
        if (categoria === "categories") {
          return Object.keys(items).map((subcategoria) => (
            <div key={subcategoria}>
              <h3>{subcategoria.toUpperCase()}</h3>
              <ul>
                {items[subcategoria].map((item, index) => (
                  <li key={index}>
                    {item.nombre} - $
                    <input
                      type="number"
                      value={item.precio}
                      onChange={(e) =>
                        actualizarPrecio(subcategoria, index, e.target.value)
                      }
                    />
                  </li>
                ))}
              </ul>
            </div>
          ));
        }

        // Manejar las categorías principales
        if (!Array.isArray(items)) {
          return null;
        }

        return (
          <div key={categoria}>
            <h3>{categoria.toUpperCase()}</h3>
            <ul>
              {items.map((item, index) => (
                <li key={index}>
                  {item.nombre} - $
                  <input
                    type="number"
                    value={item.precio}
                    onChange={(e) =>
                      actualizarPrecio(categoria, index, e.target.value)
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      <button onClick={guardarCambios}>Guardar Cambios</button>
    </div>
  );
}

export default App

