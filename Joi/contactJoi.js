const Joi = require("joi");

const SchemaContact = Joi.object({
    firstname: Joi.string().max(50).required(),
    lastname: Joi.string().max(50).required(),
    company: Joi.string().max(50),
    email: Joi.string().email().max(250).required(),
  }),
  SchemaContactText = Joi.object({
    textMessage: Joi.string().max(700).required(),
  });

function validContact(req, res, next) {
  const textMessage = req.body.textMessage,
    validation = SchemaContact.validate(req.hubspot),
    validationTextMessage = SchemaContactText.validate({ textMessage });

  if (validationTextMessage.error) {
    return res.status(400).json({
      message: "Error 400",
      description: validation.error.details[0].message,
    });
  }

  if (validation.error) {
    return res.status(400).json({
      message: "Error 400",
      description: validation.error.details[0].message,
    });
  }

  next();
}

module.exports = validContact;
