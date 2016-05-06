module.exports = {
  development: {
    host: 'findlee.space',
    port: 8080,
    websocket: {

    },
    session: {
      resave: false,
      maxAge: 3600000,
      domain: "localhost"
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
    host: 'findlee.space',
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
