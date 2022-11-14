const express = require('express');
const app = express();

app.get('/', (request, response) => {
    response.send('Hello World');
});

app.listen(3030, () => console.log('Listening on port 3030...'));
