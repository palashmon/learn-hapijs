'use strict';

const Hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi');
const Mongoose = require('mongoose');

/**=============================================================
 * Create a very basic hapi server
 =============================================================*/
const server = Hapi.server({ port: 3000, host: 'localhost' });
server.start();
console.log('Server running on %s', server.info.uri);

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

/**=============================================================
 * DB connection
 =============================================================*/
const MONGODB_URL = 'mongodb://localhost/hapi-rest-api';
Mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// Add a person schema here
const PersonSchema = new Mongoose.Schema({
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
});

// Add a person model here
const PersonModel = Mongoose.model('Person', PersonSchema);

/**=============================================================
 * Routing
 =============================================================*/

// Read Route
server.route({
  method: 'GET',
  path: '/people',
  handler: async (request, h) => {
    try {
      const people = await PersonModel.find().exec();
      return h.response(people);
    } catch (error) {
      return h.response(error).code(500);
    }
  },
});

// Create Route
server.route({
  method: 'POST',
  path: '/person',
  options: {
    validate: {
      payload: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
      }),
      failAction: (request, h, error) => {
        return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
      },
    },
  },
  handler: async (request, h) => {
    try {
      const person = new PersonModel(request.payload);
      const result = await person.save();
      return h.response(result);
    } catch (error) {
      return h.response(error).code(500);
    }
  },
});

// Not-Found route
server.route({
  method: '*',
  path: '/{any*}',
  handler: function (request, h) {
    return '404 Error! Page Not Found!';
  },
});
