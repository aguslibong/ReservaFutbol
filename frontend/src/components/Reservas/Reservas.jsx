import { ReservaListado } from "./ComponentesHijos/ReservaListado.jsx";
import ReservaRegistro from "./ComponentesHijos/ReservaRegistro.jsx";
import reservasService from "../../services/reservas/reservas.service.js";
import canchasService from "../../services/Canchas/canchas.service.js";
import clientesService from "../../services/clientes/clientes.services.js";
import tipoReservasService from "../../services/reservas/tipoReservas.service.js";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Alert from 'react-bootstrap/Alert';
import './Reservas.css';

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

  const { handleSubmit, register } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    if (!data.idReserva) {
      setShowAlert(false);
      setCurrentPage(1);
      return loadData();
    }
    const reservaFiltrada = (await reservasService.getReservas()).find((reserva) => reserva.idReserva === parseInt(data.idReserva));
    const filteredData = reservaFiltrada ? [reservaFiltrada] : [];

    if (filteredData.length === 0) {
      setShowAlert(true);
      return loadData();
    } else {
      setCurrentPage(1);
      setRows(filteredData);
      setShowAlert(false);
    }
  });

  useEffect(() => {
    loadData();
    fetchAuxiliaryData();
  }, []);

  const loadData = async () => {
    const data = await reservasService.getReservas();
    setRows(Array.isArray(data) ? data : []);
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(rows.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const searchForm = (
    <form onSubmit={onSubmit} className="d-flex">
      <input
        type="text"
        {...register("idReserva")}
        className="form-control"
        placeholder="Buscar por id de reserva"
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
            showAlert={showAlert}
            setShowAlert={setShowAlert}
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
