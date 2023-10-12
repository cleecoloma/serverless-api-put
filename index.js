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
    // Parse the incoming JSON request body
    const requestBody = JSON.parse(event.body);

    // Check if the required fields are present in the request
    if (!requestBody || !requestBody.id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required ID field.' }),
      };
    }

    // Retrieve the car to be edited from the database
    const existingCar = await carsModel.get(requestBody.id);

    // Check if the car with the provided ID exists
    if (!existingCar) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Car not found.' }),
      };
    }

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
