import { ReservaListado } from "./ComponentesHijos/ReservaListado.jsx";
import ReservaRegistro from "./ComponentesHijos/ReservaRegistro.jsx";
import reservasService from "../../services/reservas/reservas.service.js";
import canchasService from "../../services/Canchas/canchas.service.js";
import clientesService from "../../services/clientes/clientes.services.js";
import tipoReservasService from "../../services/reservas/tipoReservas.service.js";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
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
  const [showInactive, setShowInactive] = useState(false);
  const [showModal, setShowModal] = useState(false); // Nuevo estado para el modal
  const [modalAction, setModalAction] = useState(null); // Nuevo estado para la acción del modal
  const [modalReserva, setModalReserva] = useState(null); // Nuevo estado para la reserva del modal

  const { handleSubmit, register } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data.descripcion)
    if (!data.descripcion) {
      setShowAlert(false);
      setCurrentPage(1);
      return loadData();
    }
    const tipoReservaFiltrada = await tipoReservasService.getTipoReservas(data.descripcion);
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

  useEffect(() => {
    loadData();
  }, [showInactive]);

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

  const onEliminarReserva = async () => {
    if (modalReserva) {
      await reservasService.deleteReservas(modalReserva.idReserva);
      setModalReserva(null);
      setShowModal(false);
      loadData();
    }
  };

  const onToggleActivo = async () => {
    if (modalReserva) {
      modalReserva.activo = !modalReserva.activo;
      await reservasService.updateReservas(modalReserva);
      setModalReserva(null);
      setShowModal(false);
      loadData();
    }
  };

  const toggleShowInactive = () => {
    setShowInactive(prev => !prev);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(rows.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleShowModal = (action, reserva) => {
    setModalAction(action);
    setModalReserva(reserva);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setModalAction(null);
    setModalReserva(null);
    setShowModal(false);
  };

  const searchForm = (
    <form onSubmit={onSubmit} className="d-flex">
      <input
        htmlFor="tipoReserva"
        style={{ marginLeft: 50, marginRight: 20, width: 300}}
        type="text"
        {...register("descripcion")}
        id="fecha"
        className="form-control"
        placeholder="Buscar por Tipo Reserva"
        aria-label="Example text with button addon"
        aria-describedby="button-addon1"
      />
      <button className="btn btn-filtrar" type="submit" id="button-addon1" style={{ background: 'lightgreen'}}>
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
          <div style={{ alignItems: "center", display: "flex" }}>
            <button className="btn btn-secondary" id="BottonInactivas" style={{ width: 200, alignItems: "center" }} onClick={toggleShowInactive}>
              {showInactive ? 'Mostrar Inactivas' : 'Ocultar Inactivas'}
            </button>
          </div>
          <ReservaListado
            rows={currentItems}
            onModificarReserva={onModificarReserva}
            onEliminarReserva={(reserva) => handleShowModal('eliminar', reserva)}
            onToggleActivoReserva={(reserva) => handleShowModal('toggleActivo', reserva)}
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

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalAction === 'eliminar' && "¿Estás seguro de que quieres eliminar esta reserva?"}
          {modalAction === 'toggleActivo' && `¿Estás seguro de que quieres ${modalReserva?.activo ? 'desactivar' : 'activar'} esta reserva?`}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={modalAction === 'eliminar' ? onEliminarReserva : onToggleActivo}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
