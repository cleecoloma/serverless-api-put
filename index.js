'use strict';

const dynamoose = require('dynamoose');

// Define our Schema
const carsSchema = new dynamoose.Schema({
  id: Number,
  brand: String,
  model: String,
  year: Number,
});

// Create our Model
const carsModel = dynamoose.model('Cars', carsSchema);

exports.handler = async (event) => {
  try {
    // Extract the 'id' from the path parameters
    const { id } = event.pathParameters;

    // Check if the 'id' is present in the path parameters
    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Missing required ID field in path parameters.',
        }),
      };
    }

    // Retrieve the car to be edited from the database
    const existingCar = await carsModel.get(id);

    // Check if the car with the provided ID exists
    if (!existingCar) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Car not found.' }),
      };
    }

    // Parse the incoming JSON request body, if needed
    let requestBody;
    if (event.body) {
      requestBody = JSON.parse(event.body);

      // Update the car's attributes based on the request
      if (requestBody.brand) {
        existingCar.brand = requestBody.brand;
      }
      if (requestBody.model) {
        existingCar.model = requestBody.model;
      }
      if (requestBody.year) {
        existingCar.year = requestBody.year;
      }
    }

    // Save the updated car back to the database
    await existingCar.save();

    const response = {
      statusCode: 200, // 200 OK status code for successful update
      body: JSON.stringify(existingCar),
    };

    return response;
  } catch (error) {
    console.error('Error updating the car:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
