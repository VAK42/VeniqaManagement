const config = {
  server: {
    port: 3000,
    secret: 'superSecretKeyForJwtSigning'
  },
  database: {
    storage: './database.sqlite',
    dialect: 'sqlite'
  },
  uploads: {
    directory: './uploads'
  }
};
export default config;