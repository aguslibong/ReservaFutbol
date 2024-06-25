import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Menu from "./components/Menu";
import Footer from "./components/Footer/Footer.jsx";
import Login from "./components/Login.jsx";
import Canchas from "./components/Canchas/Canchas.jsx";
import TipoCancha from './components/Canchas/TipoCancha.jsx'
import Reservas from './components/Reservas/Reservas.jsx'
import TipoReservas from './components/Reservas/TipoReservas.jsx'
import Clientes from "./components/Clientes/Clientes.jsx";
import Inicio from "./components/Inicio.jsx";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div id="root">
      <BrowserRouter>
        <Menu style={{background: "green"}}/>
        <div className="main-content">
          <Routes>
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/reserva" element={<Reservas />} />
            <Route path="/cancha" element={<Canchas />} />
            <Route path="/cancha/tipocancha" element={<TipoCancha />} />
            <Route path="/cliente" element={<Clientes />} />
            <Route path="/login" element={<Login />} />
            <Route path="/tipoReserva" element={<TipoReservas />} />
            <Route path="*" element={<Navigate to="/inicio" replace />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
