import { ReservaListado } from "./ComponentesHijos/ReservaListado.jsx";
import { ReservaRegistro } from "./ComponentesHijos/ReservaRegistro.jsx";
import { getReservas, deleteReservas, updateReservas, saveReservas } from "../../services/reservas/reservas.service.js";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Reservas() {

  // Seteo los estados
  const [action, setAction] = useState('C');
  const [rows, setRows] = useState([]);
  const [selectedReserva, setSelectedReserva] = useState(null);

  //uso el useEffect para que se ejecute la función loadData una sola vez
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getReservas();
    console.log("Empleados cargados:", data);  // Log para debugging
    setRows(data);
};


  //Uso handleSubmit y register para manejar el formulario
  const { handleSubmit, register } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const filteredData = await getEmpleados(data.idReserva);
    setRows(filteredData);
  });

  //Voy a usar el method POST para agregar un empleado
  const onAgregarReserva = () => {
    setSelectedReserva(null);
    setAction('R');
  };

  const onModificarReserva = (reserva) => {
    setSelectedReserva(reserva);
    console.log(reserva);
    setAction('M');
  }

  const onEliminarReserva = async (reserva) => {
    await deleteEmpleados(reserva.idReserva);
    loadData();
  }
  //Poder hacer que quede el filtrar con el Empleado
  const searchForm = (
    <form onSubmit={onSubmit} className="d-flex">
      <input
        type="text"
        {...register("idReserva")}
        className="form-control"
        placeholder="Filtrar por Apellido y Nombre"
        aria-label="Example text with button addon"
        aria-describedby="button-addon1"
      />
      <button className="btn btn-filtrar" type="submit" id="button-addon1">
        Filtrar
      </button>
    </form>
  );

  return (
    <>
      {(action === 'R' || action === 'M') && (
        <ReservaRegistro setAction={setAction} loadData={loadData} reserva={selectedReserva}/>
      )}
      {action === 'C' && (
        <>
          <ReservaListado rows={rows} searchForm={searchForm}  onModificarEmpleado={onModificarReserva} onEliminarEmpleado={onEliminarReserva}/>
          <button type="button" style={{display: "flex"}} className="btn btn-secondary" onClick={onAgregarReserva}>Agregar Reserva</button>
        </>
      )}
    </>
  );
}
