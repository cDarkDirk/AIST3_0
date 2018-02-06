const PORT = 3001
const mockserver = require('mockserver');
const express = require('express');
const app = express()
const cors = require('cors')
const pg = require('pg');
const connection = '';

pg.connect(connection, onConnect)
app.use(cors())
app.use(mockserver('mocks'))
app.listen(PORT);

function onConnect(err, client, done) {
  //Err - This means something went wrong connecting to the database.
  if (err) {
    console.error(err);
    process.exit(1);
  }

  //For now let's end client
  client.end();
}

console.log(`Mock server listening on port ${PORT}`)
