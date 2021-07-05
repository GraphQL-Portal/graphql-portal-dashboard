const fs = require('fs');

const envPath = './build/env.js';
const env = {};

for (const key in process.env) {
  if (key.startsWith('REACT_APP')) {
    env[key] = process.env[key];
  }
}

fs.writeFileSync(envPath, `window.env = ${JSON.stringify(env)}`);
