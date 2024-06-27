import request from 'supertest';
import app from '../../../app.js';

// Datos de prueba
const tipoReservaAlta = {
  descripcion: 'Reserva de prueba'
};

const tipoReservaModificacion = {
  descripcion: 'Reserva de prueba modificada'
};

// Test GET /api/tipoReserva
describe('GET /api/tipoReserva', () => {
  it('Deberia devolver todas las tipos de reservas', async () => {
    const res = await request(app).get('/api/tipoReserva');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          idTipoReserva: expect.any(Number),
          descripcion: expect.any(String),
        }),
      ])
    );
  });
});

// Test GET /api/tipoReserva/:id
describe('GET /api/tipoReserva/:id', () => {
  it('Deberia devolver el tipo de reserva con el id 2', async () => {
    const res = await request(app).get('/api/tipoReserva/2');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        idTipoReserva: 2,
        descripcion: expect.any(String),
      })
    );
  });

  it('Deberia devolver un error 404 si el tipo de reserva no existe', async () => {
    const res = await request(app).get('/api/tipoReserva/9999');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(
      expect.objectContaining({
        error: 'Reserva no encontrada'
      })
    );
  });
});

// Test POST /api/tipoReserva
describe('POST /api/tipoReserva', () => {
  it('Deberia crear y devolver el nuevo tipo de reserva', async () => {
    const res = await request(app).post('/api/tipoReserva').send(tipoReservaAlta);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        idTipoReserva: expect.any(Number),
        descripcion: tipoReservaAlta.descripcion,
      })
    );
  });

  it('Deberia devolver un error 400 si la descripcion esta ausente', async () => {
    const res = await request(app).post('/api/tipoReserva').send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(
      expect.objectContaining({
        error: expect.any(String)
      })
    );
  });
});

// Test PUT /api/tipoReserva/:id
describe('PUT /api/tipoReserva/:id', () => {
  it('Deberia actualizar y devolver el tipo de reserva modificada', async () => {
    const res = await request(app).put('/api/tipoReserva/3').send(tipoReservaModificacion);
    expect(res.statusCode).toEqual(204);
    expect(res.body).toEqual('Se ha actualizado correctamente');

    // Verifica que se haya modificado
    const resGet = await request(app).get('/api/tipoReserva/3');
    expect(resGet.body.descripcion).toEqual(tipoReservaModificacion.descripcion);
  });

  it('Deberia devolver un error 404 si el tipo de reserva no existe', async () => {
    const res = await request(app).put('/api/tipoReserva/9999').send(tipoReservaModificacion);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(
      expect.objectContaining({
        error: 'Tipo Reserva no encontrada'
      })
    );
  });
});

// Test DELETE /api/tipoReserva/:id
describe('DELETE /api/tipoReserva/:id', () => {
  it('Deberia borrar el tipo de reserva con el id 1', async () => {
    const res = await request(app).delete('/api/tipoReserva/1');
    expect(res.statusCode).toEqual(204);
    expect(res.body).toEqual('Se a eliminado correctamente!');
  });

  it('Deberia devolver un error 404 si el tipo de reserva no existe', async () => {
    const res = await request(app).delete('/api/tipoReserva/9999');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(
      expect.objectContaining({
        error: 'Reserva no encontrada'
      })
    );
  });
});
