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
    const requestBody = JSON.parse(event.body);

    if (
      !requestBody ||
      !requestBody.id ||
      !requestBody.brand ||
      !requestBody.model ||
      !requestBody.year
    ) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields.' }),
      };
    }

    const newCar = new carsModel({
      id: requestBody.id,
      brand: requestBody.brand,
      model: requestBody.model,
      year: requestBody.year,
    });

    await newCar.save();

    const response = {
      statusCode: 201, // 201 Created status code for successful resource creation
      body: JSON.stringify(newCar),
    };

    return response;
  } catch (error) {
    console.error('Error creating a new car:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
