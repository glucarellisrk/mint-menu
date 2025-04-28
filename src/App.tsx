import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Menu from "./components/Menu";
import Admin from "./components/Admin";
import Login from "./components/Login";
import React, { useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route 
            path="/admin" 
            element={isAuthenticated ? <Admin /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
