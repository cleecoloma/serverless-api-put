'use strict';

const { handler } = require('./index.js');

describe('Testing the editCar lambda function', () => {
  test('Should edit an existing car and return a 200 status code', async () => {
    // Define the car data to be edited
    const carData = {
      id: 1, // Provide the ID of the existing car you want to edit
      brand: 'UpdatedBrand', // Provide the updated brand
      model: 'UpdatedModel', // Provide the updated model
      year: 2023, // Provide the updated year
    };

    const event = {
      pathParameters: { id: 1 }, // Specify the existing car's ID as a path parameter
      body: JSON.stringify(carData),
    };

    let response = await handler(event);
    expect(response.statusCode).toEqual(200); // 200 OK status code

    const responseBody = JSON.parse(response.body);
    expect(responseBody.id).toEqual(carData.id);
    expect(responseBody.brand).toEqual(carData.brand);
    expect(responseBody.model).toEqual(carData.model);
    expect(responseBody.year).toEqual(carData.year);
  });

  test('Should return a 404 status code for a non-existing car', async () => {
    // Provide an ID that doesn't correspond to an existing car
    const carData = {
      id: 999, // A non-existing ID
      brand: 'UpdatedBrand',
      model: 'UpdatedModel',
      year: 2023,
    };

    const event = {
      pathParameters: { id: 999 }, // Specify a non-existing ID as a path parameter
      body: JSON.stringify(carData),
    };

    let response = await handler(event);
    expect(response.statusCode).toEqual(404); // 404 Not Found status code
  });
});
