import request from "supertest";
import app from "../../../app.js"; // Asegúrate de que este es el camino correcto a tu archivo de servidor

const tipocanchaAlta = {
  descripcion: "tipoCancha de prueba"
};

const tipocanchaModificacion = {
  idTipoCancha: 2,
  descripcion: "tipoCancha de prueba"
};

// test route/tipocancha GET
describe("GET /api/tipocancha", () => {
  it("Debería devolver todas las tipocanchas", async () => {
    const res = await request(app).get("/api/tipocancha");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          idTipoCancha: expect.any(Number),
          descripcion: expect.any(String),
        }),
      ])
    );
  });
});

// test route/tipocancha/:id GET
describe("GET /api/tipocancha/:id", () => {
  it("Debería devolver la tipocancha con el id 2", async () => {
    const res = await request(app).get("/api/tipocancha/2");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        idTipoCancha: 2,
        descripcion: expect.any(String),
      })
    );
  });
});

// test route/tipocancha POST
describe("POST /api/tipocancha", () => {
  it("Debería devolver la tipocancha que acabo de crear", async () => {
    const res = await request(app).post("/api/tipocancha").send(tipocanchaAlta);
    expect(res.statusCode).toBe(200); // Tu API devuelve 200 en lugar de 201
    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number), // El API devuelve solo el id
      })
    );
  });
});

// test route/tipocancha PUT
describe("PUT /api/tipocancha", () => {
  it("Debería devolver la tipocancha con el id 3 modificada", async () => {
    const res = await request(app).put("/api/tipocancha").send(tipocanchaModificacion);
    expect(res.statusCode).toBe(200);

    // verifica que se haya modificado
    const resGet = await request(app).get("/api/tipocancha/3");
    expect(resGet.body.descripcion).toBe(tipocanchaModificacion.descripcion);
  });
});

// test route/tipocancha/:id DELETE
describe("DELETE /api/tipocancha/:id", () => {
  it("Debería devolver la tipocancha con el id 3 borrada", async () => {
    const res = await request(app).delete("/api/tipocancha/3");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: 'tipoCancha eliminada exitosamente',
      })
    );
  });
});
