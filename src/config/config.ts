export default {
  uri: process.env.DATABASE_URL || 'postgres://postgres:12345@localhost/test',
  port: process.env.PORT || 8080,
};
