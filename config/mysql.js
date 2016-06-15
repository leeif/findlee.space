module.exports = {

  development: {
    username: "findlee",
    password: "w19920610",
    host: "127.0.0.1",
    database: "findlee_dev",
    dialect: "mysql",
    define: {
      timestamps: false
    }
  },

  test: {
    username: "root",
    password: "",
    database: "findlee_test",
    host: "127.0.0.1",
    dialect: "mysql",
    define: {
      timestamps: false
    }
  },

  production: {
    username: "findlee",
    password: "w19920610",
    database: "findlee",
    host: "127.0.0.1",
    dialect: "mysql",
    define: {
      timestamps: false
    }
  }
};
