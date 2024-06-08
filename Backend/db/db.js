import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./db/datos.sqlite"
});

export default sequelize;
