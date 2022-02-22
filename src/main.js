// @ts-check

require('dotenv').config();

const { PORT } = require('./common');
const app = require('./app');

app.listen(PORT, () => {
  console.log(`The Express server is listening at port: ${PORT}`);
});
