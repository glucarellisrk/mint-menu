import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import Admin from "./components/Admin";
import React from "react";

function App() {
  return (
    <Router>
      <div>
        <h1>Menú Digital</h1>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
