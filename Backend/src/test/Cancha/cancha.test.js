import request from "supertest";
import app from "../../../app.js"; // Asegúrate de que este es el camino correcto a tu archivo de servidor

const canchaAlta = {
  fechaMantenimiento: new Date().toISOString().split('T')[0], // Solo la fecha
  idTipoCancha: 1,
  descripcion: "Cancha de prueba",
  foto: "http://example.com/foto.jpg",
};

const canchaModificacion = {
  idCancha: 5,
  fechaMantenimiento: new Date().toISOString().split('T')[0],
  idTipoCancha: 1,
  descripcion: "Cancha de prueba modificada",
  foto: "http://example.com/foto2.jpg",
};


// test route/cancha GET
describe("GET /api/cancha", () => {
  it("Debería devolver todas las canchas", async () => {
    const res = await request(app).get("/api/cancha");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          idCancha: expect.any(Number),
          fechaMantenimiento: expect.any(String),
          idTipoCancha: expect.any(Number),
          descripcion: expect.any(String),
          foto: expect.any(String),
        }),
      ])
    );
  });
});

// test route/cancha/:id GET
describe("GET /api/cancha/:id", () => {
  it("Debería devolver la cancha con el id 5", async () => {
    const res = await request(app).get("/api/cancha/5");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        idCancha: 5,
        fechaMantenimiento: expect.any(String),
        idTipoCancha: expect.any(Number),
        descripcion: expect.any(String),
        foto: expect.any(String),
      })
    );
  });
});

// test route/cancha POST
describe("POST /api/cancha", () => {
  it("Debería devolver la cancha que acabo de crear", async () => {
    const res = await request(app).post("/api/cancha").send(canchaAlta);
    expect(res.statusCode).toBe(200); // Tu API devuelve 200 en lugar de 201
    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number), // El API devuelve solo el id
      })
    );
  });
});

// test route/cancha PUT
describe("PUT /api/cancha", () => {
  it("Debería devolver la cancha con el id 5 modificada", async () => {
    const res = await request(app).put("/api/cancha").send(canchaModificacion);
    expect(res.statusCode).toBe(200);

    // verifica que se haya modificado
    const resGet = await request(app).get("/api/cancha/5");
    expect(resGet.body.descripcion).toBe(canchaModificacion.descripcion);
  });
});

// test route/cancha/:id DELETE
describe("DELETE /api/cancha/:id", () => {
  it("Debería devolver la cancha con el id 8 borrada", async () => {
    const res = await request(app).delete("/api/cancha/8");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: 'Cancha eliminada exitosamente',
      })
    );
  });
});
