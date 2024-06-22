import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Menu } from "./components/Menu";
import { Footer } from "./components/Footer";
import { Login } from "./components/Login.jsx";
import { Canchas } from "./components/Canchas.jsx"
import { Reservas } from "./components/Reservas.jsx"
import { Clientes } from "./components/Clientes.jsx"
import { Inicio } from "./components/Inicio.jsx"



function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <div>
          <Routes>
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/canchas" element={<Canchas />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/login/:componentFrom" element={<Login />} />
            <Route path="*" element={<Navigate to="/inicio" replace />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;