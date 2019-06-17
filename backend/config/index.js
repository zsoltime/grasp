const config = {
  db: process.env.MONGO_URI,
  port: process.env.PORT || 8000,
  jwtSecret: process.env.JWT_SECRET || 'jwt_secret',
  sessionSecret: process.env.SESSION_SECRET || 'session_secret',
};

if (process.env.NODE_ENV === 'test') {
  config.db = process.env.MONGO_URI_TEST;
  config.port = process.env.PORT_TEST;
} else if (process.env.NODE_ENV === 'development') {
  config.db = process.env.MONGO_URI_DEV;
  config.port = process.env.PORT_DEV;
}

module.exports = config;
