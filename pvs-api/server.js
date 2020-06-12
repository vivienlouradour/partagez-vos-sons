const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;
const mongoUrl = 'mongodb://pvsdb';
const mongoDbName = 'pvs'
const Routes = require('./route.config');

console.log('server.js started');

main()
  .then(console.log('main finished'))
  .catch(console.error);
  
async function main() {
  app.use(cors());
  Routes.routesConfig(app);

  await mongoose.connect(`${mongoUrl}/${mongoDbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });


  app.listen(port, function () {
    console.log('Listening on http://localhost:' + port);
  });
}


