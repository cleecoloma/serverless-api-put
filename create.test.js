'use strict';

const { handler } = require('./index.js');

describe('Testing the createCar lambda function', () => {
  test('Should create a new car and return a 201 status code', async () => {
    // Define the car data to be created
    const carData = {
      id: 1,
      brand: 'Toyota',
      model: 'Camry',
      year: 2022,
    };

    const event = {
      body: JSON.stringify(carData),
    };

    let response = await handler(event);
    expect(response.statusCode).toEqual(201); // 201 Created status code

    const responseBody = JSON.parse(response.body);
    expect(responseBody.id).toEqual(carData.id);
    expect(responseBody.brand).toEqual(carData.brand);
    expect(responseBody.model).toEqual(carData.model);
    expect(responseBody.year).toEqual(carData.year);
  });

  test('Should return a 400 status code for a missing field', async () => {
    // Define the car data with a missing field (e.g., model)
    const carData = {
      brand: 'Honda',
      year: 2022,
    };

    const event = {
      body: JSON.stringify(carData),
    };

    let response = await handler(event);
    expect(response.statusCode).toEqual(400); // 400 Bad Request status code
  });
});
