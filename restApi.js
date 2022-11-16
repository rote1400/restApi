const express = require('express');
const Joi = require(`joi`)
const app = express();

app.use(express.json());

const cities = [
    { id: 1, name: `Seul` },
    { id: 2, name: `Pekin` },
    { id: 3, name: `Stockholm` }
];

// GET
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

// POST
app.post('/api/cities', (request, response) => {
    // Validate if the city's name is correct
    const resultValidation = validateCity(request.body);
    if (resultValidation.error) {
        response.status(400).send(resultValidation.error.details[0].message);
        return;
    }
    
    // Add the city
    const city = {
        id : cities.length + 1,
        name : request.body.name
    };
    cities.push(city);
    response.send(city);
});

// Updade PUT
app.put(`/api/cities/:id`, (request, response) => {
    // Check if the city exists
    const city = cities.find(city => city.id === parseInt(request.params.id));
    if(!city) response.status(404).send(`City not found`);

    // Validate if the city's name is correct
    const resultValidation = validateCity(request.body);
    if (resultValidation.error) {
        response.status(400).send(resultValidation.error.details[0].message);
        return;
    }

    // Update the name of the city
    city.name = request.body.name;
    response.send(city);
});

// Validate that the name of the city contains at least two symbols
function validateCity(city) {
    const schema = {
        name : Joi.string().min(2).required()
    };

    return Joi.validate(city, schema);
}

// Port
const port = process.env.port || 3030;
app.listen(port, () => console.log(`Listening on port ${port}...`));
