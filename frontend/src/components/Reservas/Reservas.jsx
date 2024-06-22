// Componente padre: Reservas.jsx
import { ReservaListado } from "./ComponentesHijos/ReservaListado.jsx";
import ReservaRegistro from "./ComponentesHijos/ReservaRegistro.jsx";
import reservasService from "../../services/reservas/reservas.service.js";
import canchasService from "../../services/Canchas/canchas.service.js";
import clientesService from "../../services/clientes/clientes.services.js";
import tipoReservasService from "../../services/reservas/tipoReservas.service.js";
import { useState, useEffect } from "react";

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
          <button type="button" style={{display: "flex"}} className="btn btn-secondary" onClick={onAgregarReserva}>Agregar Reserva</button>
        </>
      )}
    </>
  );
}
