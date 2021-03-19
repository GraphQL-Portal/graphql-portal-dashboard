// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./config/Config.d.ts" />
import { config as appConfig } from 'node-config-ts';

const config = {
  mongodb: {
    url: appConfig.db.mongodb.connectionString,
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
