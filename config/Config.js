module.exports = {

  development: {
    username: "root",
    password: "w19920610",
    database: "gctw",
    host: "127.0.0.1",
    dialect: "mysql",
    define: {
      timestamps: false
    },
    port: "8080",
    redis: {},
    websocket: {},
    session: {
      resave: true,
      maxAge: 360000,
      domain: "localhost"
    }
  },
  test: {
    username: "root",
    password: "w19920610",
    database: "findlee_test",
    host: "127.0.0.1",
    dialect: "mysql",
    define: {
      timestamps: false
    },
    port: "8080",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
    define: {
      timestamps: false
    },
    port: "3030",
  }
};
