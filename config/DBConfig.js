module.exports = {

  development: {
    username: "root",
    password: "w19920610",
    database: "finlee_dev",
    dialect: "mysql",
    define: {
      timestamps: false
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
  },

  production: {
    username: "root",
    password: null,
    database: "findlee",
    host: "127.0.0.1",
    dialect: "mysql",
    define: {
      timestamps: false
    }
  }
};
