import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Alert from 'react-bootstrap/Alert';
import './Reservas.css';
import { ReservaListado } from "./ComponentesHijos/ReservaListado.jsx";
import ReservaRegistro from "./ComponentesHijos/ReservaRegistro.jsx";
import reservasService from "../../services/reservas/reservas.service.js";
import canchasService from "../../services/Canchas/canchas.service.js";
import clientesService from "../../services/clientes/clientes.services.js";
import tipoReservasService from "../../services/reservas/tipoReservas.service.js";

export default function Reservas() {
  const [action, setAction] = useState('C');
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedReserva, setSelectedReserva] = useState(null);
  const [canchas, setCanchas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [tipoReservas, setTipoReservas] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [showInactive, setShowInactive] = useState(false); // Nuevo estado para mostrar reservas inactivas

  const { handleSubmit, register } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    if (!data.fecha) {
      setShowAlert(false);
      setCurrentPage(1);
      return loadData();
    }
    const reservaFiltrada = await reservasService.getReservasPorFecha(data.fecha);
    if (!Array.isArray(reservaFiltrada) || reservaFiltrada.length === 0) {
      setShowAlert(true);
      return loadData();
    } else {
      setCurrentPage(1);
      setRows(reservaFiltrada);
      setShowAlert(false);
    }
  });

  useEffect(() => {
    loadData();
    fetchAuxiliaryData();
  }, []);

  const loadData = async () => {
    const data = await reservasService.getReservas();
    const filteredData = showInactive ? data : data.filter(reserva => reserva.activo);
    setRows(Array.isArray(filteredData) ? filteredData : []);
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

  const toggleShowInactive = () => {
    setShowInactive(!showInactive);
    loadData();
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(rows.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const searchForm = (
    <form onSubmit={onSubmit} className="d-flex">
      <label htmlFor="fecha" style={{ marginRight: 10 }}>Filtrar por fecha:</label>
      <input
        type="date"
        {...register("fecha")}
        id="fecha"
        className="form-control"
        placeholder="Buscar por Fecha"
        aria-label="Example text with button addon"
        aria-describedby="button-addon1"
      />
      <button className="btn btn-filtrar" type="submit" id="button-addon1" style={{ background: 'lightgreen', marginLeft: 20 }}>
        Buscar
      </button>
    </form>
  );

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
          <button className="btn btn-secondary" onClick={toggleShowInactive}>
            {showInactive ? 'Ocultar Inactivas' : 'Mostrar Inactivas'}
          </button>
          <ReservaListado
            rows={currentItems}
            onModificarReserva={onModificarReserva}
            onEliminarReserva={onEliminarReserva}
            canchas={canchas}
            clientes={clientes}
            tipoReservas={tipoReservas}
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            searchForm={searchForm}
            onAgregarReserva={onAgregarReserva}
            showAlert={showAlert}
            setShowAlert={setShowAlert}
          />
        </>
      )}
    </>
  );
}
