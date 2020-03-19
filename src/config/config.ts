export default {
  development: {
    uri: 'postgres://postgres:12345@localhost/development',
    port: 8080,
  },
  test: {
    uri: 'postgres://postgres:12345@localhost/test',
    port: 8080,
  },
  production: {
    uri: process.env.DATABASE_URL || 'postgres://postgres:12345@localhost/production',
    port: Number(process.env.PORT) || 8080,
  },
};
