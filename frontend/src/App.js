import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/students" element={<Students />} />

        <Route path="/add" element={<AddStudent />} />

        <Route path="/edit/:id" element={<EditStudent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;