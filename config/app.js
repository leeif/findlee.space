module.exports = {
  development: {
    host: 'localhost',
    port: 8080,
    websocket: {

    },
    session: {
      resave: false,
<<<<<<< HEAD
      maxAge: 3600000,
      domain: "findlee.space"
=======
      maxAge: 3600000*24,
      domain: "localhost"
    },
    redis: {
      prefix: "findlee_blog",
      port: 6379,
      password: 'w19920610'
>>>>>>> dev
    }
  },

  test: {
    host: 'localhost',
    port: 8080,
    websocket: {

    },
    session: {
      resave: false,
      maxAge: 3600000*24,
      domain: "localhost"
    },
    redis: {
      prefix: "findlee_blog",
      port: 6379,
      password: ''
    }
  },

  production: {
    host: 'localhost',
    port: 3000,
    websocket: {

    },
    session: {
      resave: false,
      maxAge: 3600000*24,
      domain: "findlee.space"
    },
    redis: {
      prefix: "findlee_blog",
      port: 6379,
      password: 'w19920610'
    }
  }
};
