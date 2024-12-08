const express = require('express');
const routes = require('./routes');
const config = require('./config');

const app = express();

app.use(express.json());
app.use('/api', routes);

app.listen(config.server.port, () => {
  console.log(`Backend running on http://localhost:${config.server.port}`);
});
