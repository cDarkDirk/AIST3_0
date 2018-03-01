const PORT = 3001
const mockserver = require('mockserver');
const express = require('express');
const app = express()
const cors = require('cors')

app.use(cors())
app.use(mockserver('mocks'))
app.listen(PORT);


console.log(`Mock server listening on port ${PORT}`)
