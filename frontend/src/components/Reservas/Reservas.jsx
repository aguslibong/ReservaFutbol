// Componente padre: Reservas.jsx
import { ReservaListado } from "./ComponentesHijos/ReservaListado.jsx";
import ReservaRegistro from "./ComponentesHijos/ReservaRegistro.jsx";
import reservasService from "../../services/reservas/reservas.service.js";
import canchasService from "../../services/Canchas/canchas.service.js";
import clientesService from "../../services/clientes/clientes.services.js";
import tipoReservasService from "../../services/reservas/tipoReservas.service.js";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'

export default function Reservas() {
  const [action, setAction] = useState('C');
  const [rows, setRows] = useState([]);
  const [selectedReserva, setSelectedReserva] = useState(null);
  const [canchas, setCanchas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [tipoReservas, setTipoReservas] = useState([]);

  useEffect(() => {
    loadData();
    fetchAuxiliaryData();
  }, []);

  const loadData = async () => {
    const data = await reservasService.getReservas();
    setRows(data);
  };

  const fetchAuxiliaryData = async () => {
    const [canchasData, clientesData, tipoReservasData] = await Promise.all([
      canchasService.getCanchas(),
      clientesService.getClientes(),
      tipoReservasService.getTipoReservas()
    ]);
    setCanchas(canchasData);
    setClientes(clientesData);
    setTipoReservas(tipoReservasData);
  };

  const onAgregarReserva = () => {
    setSelectedReserva(null);
    setAction('R');
  };

  const onModificarReserva = (reserva) => {
    setSelectedReserva(reserva);
    setAction('M');
  };

  const onEliminarReserva = async (reserva) => {
    await reservasService.deleteReservas(reserva.idReserva);
    loadData();
  };

  return (
    <>
      {(action === 'R' || action === 'M') && (
        <ReservaRegistro
          setAction={setAction}
          loadData={loadData}
          reserva={selectedReserva}
          canchas={canchas}
          clientes={clientes}
          tipoReservas={tipoReservas}
        />
      )}
      {action === 'C' && (
        <>
          <ReservaListado
            rows={rows}
            onModificarReserva={onModificarReserva}
            onEliminarReserva={onEliminarReserva}
            canchas={canchas}
            clientes={clientes}
            tipoReservas={tipoReservas}
          />
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
            <button type="button" style={{ width: 150, background: "green" }} className="btn btn-secondary" onClick={onAgregarReserva}>
              Agregar Reserva
            </button>
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
            <Link to="/inicio" className="btn btn-primary m-3">Menu</Link>
            <Link to="/tipoReserva" className="btn btn-primary m-3">Gestionar Tipo de Reserva</Link>
          </div>
        </>
      )}
    </>
  );
}
