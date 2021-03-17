const config = {
  mongodb: {
    url:
      process.env.MONGODB_CONNECTION_STRING ||
      'mongodb://localhost:27017/graphql-portal-dashboard',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },

  migrationsDir: './src/data/migrations',
  changelogCollectionName: 'changelog',
  migrationFileExtension: '.ts',
  useFileHash: false,
};

module.exports = config;
