const express = require('express');
const app = express();

app.get('/', (request, response) => {
    response.send('Hello World');
});

app.get('/api/cities', (request, response) => {
    response.send([1, 2, 3]);
});

// Port
const port = process.env.port || 3030;
app.listen(port, () => console.log(`Listening on port ${port}...`));
