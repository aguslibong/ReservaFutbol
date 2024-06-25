import React from "react";
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Alert from 'react-bootstrap/Alert';

export default function TipoReservaListado({ rows, onModificar, onEliminar, totalPages, currentPage, handlePageChange, searchForm, showAlert, setShowAlert }) {

    const onClickModificar = (tipoReserva) => {
        onModificar(tipoReserva);
    };

    const onClickEliminar = (tipoReserva) => {
        onEliminar(tipoReserva);
    };

    if (!rows || rows.length === 0) {
        return (
            <div className="container mt-5">
                <div className="header-container p-3 mb-2 bg-primary text-white rounded d-flex justify-content-between align-items-center">
                    <h2 className="mb-0" style={{ fontFamily: 'monospace' }}>TIPOS DE RESERVA</h2>
                    {searchForm}
                </div>
                {showAlert && (
                  <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                    No se encontró un tipo de reserva con el ID proporcionado.
                  </Alert>
                )}
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </Table>
            </div>
        );
    }

    const tbody = rows.map((tipoReserva) => (
        <tr key={tipoReserva.idTipoReserva}>
            <td>{tipoReserva.idTipoReserva}</td>
            <td>{tipoReserva.descripcion}</td>
            <td>
                <button onClick={() => onClickModificar(tipoReserva)} className="btn btn-warning me-2">Modificar</button>
                <button onClick={() => onClickEliminar(tipoReserva)} className="btn btn-danger">Eliminar</button>
            </td>
        </tr>
    ));

    const renderPageNumbers = () => {
        let items = [];
        for (let number = 1; number <= totalPages; number++) {
            items.push(
                <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
                    {number}
                </Pagination.Item>,
            );
        }
        return items;
    };

    return (
        <div className="container mt-5">
            <div className="header-container p-3 mb-2 bg-primary text-white rounded d-flex justify-content-between align-items-center">
                <h2 className="mb-0" style={{ fontFamily: 'monospace', marginRight: 20 }}>TIPOS DE RESERVA</h2>
                {searchForm}
            </div>
            {showAlert && (
              <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                No se encontró un tipo de reserva con el ID proporcionado.
              </Alert>
            )}
            <div className="table-container">
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tbody}
                    </tbody>
                </Table>
                <div className="pagination">
                    <Pagination>{renderPageNumbers()}</Pagination>
                </div>
            </div>
        </div>
    );
}
