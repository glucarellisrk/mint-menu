import express from "express";
import fs from "fs";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta para obtener el menú
app.get("/menu", (req, res) => {
  fs.readFile("./public/menu.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error leyendo el archivo:", err);
      res.status(500).send("Error al leer el menú.");
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// Ruta para actualizar el menú
app.post("/menu", (req, res) => {
  const nuevoMenu = req.body;

  fs.writeFile("./public/menu.json", JSON.stringify(nuevoMenu, null, 2), (err) => {
    if (err) {
      console.error("Error escribiendo el archivo:", err);
      res.status(500).send("Error al guardar el menú.");
    } else {
      res.send("Menú actualizado correctamente.");
    }
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});