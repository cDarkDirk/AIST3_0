const PORT = 9001
const http    =  require('http');
const mockserver  =  require('mockserver');

console.log(`Mock server listening on port ${PORT}`)
http.createServer(mockserver('mocks')).listen(PORT);
