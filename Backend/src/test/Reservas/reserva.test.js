import request from 'supertest';
import app from '../../../app.js';

// Datos de prueba
const reservaAlta = {
  fechaReserva: new Date().toISOString().split('T')[0],
  idCancha: 2,
  idCliente: 2,
  idTipoReserva: 2,
  comprobante: 'Comprobante123',
  hora: '12:00'
};

const reservaModificacion = {
  idReserva: 27,
  fechaReserva: new Date().toISOString().split('T')[0],
  idCancha: 2,
  idCliente: 2,
  idTipoReserva: 2,
  comprobante: 'Comprobante123_modificado',
  hora: '13:00'
};

// Test GET /api/reserva
describe('GET /api/reserva', () => {
  it('Deberia devolver todas las reservas', async () => {
    const res = await request(app).get('/api/reserva');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          idReserva: expect.any(Number),
          fechaReserva: expect.any(String),
          idCancha: expect.any(Number),
          idCliente: expect.any(Number),
          idTipoReserva: expect.any(Number),
          comprobante: expect.any(String),
          hora: expect.any(String),
        }),
      ])
    );
  });
});

// Test GET /api/reserva/:id
describe('GET /api/reserva/:id', () => {
  it('Deberia devolver la reserva con el id 27', async () => {
    const res = await request(app).get('/api/reserva/27');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        idReserva: 27,
        fechaReserva: expect.any(String),
        idCancha: expect.any(Number),
        idCliente: expect.any(Number),
        idTipoReserva: expect.any(Number),
        comprobante: expect.any(String),
        hora: expect.any(String),
      })
    );
  });

  it('Deberia devolver un error 404 si la reserva no existe', async () => {
    const res = await request(app).get('/api/reserva/9999');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(
      expect.objectContaining({
        error: 'Reserva no encontrada'
      })
    );
  });
});

// Test POST /api/reserva
describe('POST /api/reserva', () => {
  it('Deberia crear y devolver la nueva reserva', async () => {
    const res = await request(app).post('/api/reserva').send(reservaAlta);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        idReserva: expect.any(Number),
        fechaReserva: reservaAlta.fechaReserva,
        idCancha: reservaAlta.idCancha,
        idCliente: reservaAlta.idCliente,
        idTipoReserva: reservaAlta.idTipoReserva,
        comprobante: reservaAlta.comprobante,
        hora: reservaAlta.hora
      })
    );
  });

  it('Deberia devolver un error 400 si falta algun campo obligatorio', async () => {
    const res = await request(app).post('/api/reserva').send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(
      expect.objectContaining({
        error: expect.any(String)
      })
    );
  });
});

// Test PUT /api/reserva/:id
describe('PUT /api/reserva/:id', () => {
  it('Deberia actualizar y devolver la reserva modificada', async () => {
    const res = await request(app).put('/api/reserva/27').send(reservaModificacion);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual('Se ha actualizado correctamente');

    // Verifica que se haya modificado
    const resGet = await request(app).get('/api/reserva/27');
    expect(resGet.body.comprobante).toEqual(reservaModificacion.comprobante);
  });

  it('Deberia devolver un error 404 si la reserva no existe', async () => {
    const res = await request(app).put('/api/reserva/9999').send(reservaModificacion);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(
      expect.objectContaining({
        error: 'Reserva no encontrada'
      })
    );
  });

  it('Deberia devolver un error 400 si los datos son invalidos', async () => {
    const res = await request(app).put('/api/reserva/27').send({ fechaReserva: 'invalido' });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(
      expect.objectContaining({
        error: expect.any(String)
      })
    );
  });
});

// Test DELETE /api/reserva/:id
describe('DELETE /api/reserva/:id', () => {
  it('Deberia borrar la reserva con el id 27', async () => {
    const res = await request(app).delete('/api/reserva/27');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual('Se a eliminado correctamente!');
  });

  it('Deberia devolver un error 404 si la reserva no existe', async () => {
    const res = await request(app).delete('/api/reserva/9999');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(
      expect.objectContaining({
        error: 'Reserva no encontrada'
      })
    );
  });
});
