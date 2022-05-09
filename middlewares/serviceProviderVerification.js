const express = require("express");
const Joi = require("joi");
const router = express.Router();

const newServiceProviderForm = Joi.object({
    firstname: Joi.string().max(50).required(),
    lastame: Joi.string().max(50).required(),
    jobtitle: Joi.string().max(100).required(),
    company: Joi.string().max(50).required(),
    email: Joi.string()
    .unique()
    .email()
    .max(250)
    .required(),
    phone: Joi.string().max(20).required(),
    address: Joi.string().max(200),
    city: Joi.string().max(50),
    zip: Joi.string().max(10),
    Industry: Joi.string().max(150),
    interet: Joi.string().max(50).required()
  });
  
  function validateNewServiceProviderForm(req, res, next) {
    const validation = newServiceProviderForm.validate(req.body);
  
    if (validation.error) {
      return res.status(400).json({
        message: "Error 400",
        description: validation.error.details[0].message,
      });
    }
  
    next();
  }

  module.exports = validateNewServiceProviderForm