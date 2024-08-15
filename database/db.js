import knex from "knex";

export const db = knex({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "123",
    database: "d_notes",
  },
});
