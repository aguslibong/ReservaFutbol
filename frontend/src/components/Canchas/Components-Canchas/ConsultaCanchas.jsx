import React, { useState } from 'react';
import { Container, Row, Col, Button, Table, Modal } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ConsultaCanchas = ({ rows, onRegistrar, onModificar, onDelete, buscarId, tipoCancha, onMostrar, mostrandoActivos }) => {
    const [inputValue, setInputValue] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [canchaToDelete, setCanchaToDelete] = useState(null);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
    };

    const onClickDelete = async (cancha) => {
        setCanchaToDelete(cancha);
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        onDelete(canchaToDelete.idCancha);
        setShowModal(false);
        setCanchaToDelete(null);
    };

    const onClickUpdate = async (cancha, accion) => {
        onModificar(cancha, accion);
    };

    const onClickBuscar = async () => {
        buscarId(inputValue);
    };

    const getNombreTipoCancha = (idTipoCancha) => {
        const nombreTipoCancha = tipoCancha.find(tc => tc.idTipoCancha === idTipoCancha);
        return nombreTipoCancha ? nombreTipoCancha.descripcion : '';
    };

    const tbody = rows.length > 0 ? (
        rows.map(e => (
            <tr key={e.idCancha}>
                <td>{e.descripcion}</td>
                <td>{getNombreTipoCancha(e.idTipoCancha)}</td>
                <td>
                    <img className="fotoCancha" src={e.foto} alt={e.descripcion} />
                </td>
                <td>{e.fechaMantenimiento}</td>
                <td>{e.activo ? 'Activo' : 'Inactivo'}</td>
                <td>
                    <Button className="btn btn-sm" title="Modificar" variant="secondary" onClick={() => onClickUpdate(e, 'M')}> <i className="bi bi-archive"></i></Button>
                    <Button variant="" className="btn-sm btn-warning m-3" onClick={() => onClickUpdate(e, 'bool')}>
                        {e.activo ? <i className="bi bi-ban"></i> : <i className="bi bi-check-lg"></i>}
                    </Button>
                    <Button variant="danger" className="btn-sm " onClick={() => onClickDelete(e)}><i className="bi bi-trash3"></i></Button>
                </td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="6" style={{ textAlign: 'center' }}>No se encontraron canchas</td>
        </tr>
    );

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <div className="p-3 mb-2 bg-primary text-white rounded">
                        <h2 className="mb-0" style={{ fontFamily: 'monospace' }}>GESTION CANCHAS</h2>
                    </div>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <label htmlFor="buscarId" className='label m-2'>Buscar Por Descripcion: </label>
                    <input
                        type="text"
                        id="buscarId"
                        value={inputValue}
                        onChange={handleInputChange}
                        inputMode="text"
                    />
                    <Button variant="primary" className="m-3" onClick={onClickBuscar}>Buscar</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="info" className="btn-sm mt-3" onClick={onMostrar}>{mostrandoActivos ? 'Mostrar Inactivos' : 'Mostrar Activos'}</Button>
                </Col>
                <Col>
                    <Button variant="secondary" className="btn-sm mt-3" onClick={onRegistrar}>Registrar Cancha</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table bordered>
                        <thead className="bg-light">
                            <tr>
                                <th scope="col">Descripción</th>
                                <th scope="col">Tipo Cancha</th>
                                <th scope="col">Foto</th>
                                <th scope="col">Fecha Mantenimiento</th>
                                <th scope="col">Condicion</th>
                                <th scope="col">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tbody}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmación</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Está seguro de que desea eliminar esta cancha?</Modal.Body>
                <Modal.Body>Se eliminara de Forma Permanente al igual que todas las Reservas relacionadas</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>Eliminar</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ConsultaCanchas;
