const express = require('express');
const app = express();

const cities = [
    { id: 1, name: `Sofia` },
    { id: 2, name: `Pekin` },
    { id: 3, name: `Stockholm` }
];

app.get('/', (request, response) => {
    response.send('Hello World');
});

app.get('/api/cities', (request, response) => {
    response.send(cities);
});

app.get(`/api/cities/:id`, (request, response) => {
    const city = cities.find(city => city.id === parseInt(request.params.id));
    if (!city) response.status(404).send(`City not found`);
    response.send(city);
});

// Port
const port = process.env.port || 3030;
app.listen(port, () => console.log(`Listening on port ${port}...`));
