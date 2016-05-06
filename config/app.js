module.exports = {
  development: {
    host: 'localhost',
    port: 8080,
    websocket: {

    },
    session: {
      resave: false,
      maxAge: 3600000,
      domain: "findlee.space"
    }
  },

  test: {
    host: 'localhost',
    port: 8080,
    websocket: {

    },
    session: {
      resave: false,
      maxAge: 3600000,
      domain: "localhost"
    }
  },

  production: {
    host: 'localhost',
    port: 3000,
    websocket: {

    },
    session: {
      resave: false,
      maxAge: 3600000,
      domain: "findlee.space"
    }
  }
};
