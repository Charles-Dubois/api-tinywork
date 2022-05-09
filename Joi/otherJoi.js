const Joi = require("joi"),
  SchemaOther = Joi.object({
    firstname: Joi.string().max(50).required(),
    lastname: Joi.string().max(50).required(),
    email: Joi.string().email().max(250).required(),
    phone: Joi.string().max(20),
    address: Joi.string().max(200),
    city: Joi.string().max(50),
    zip: Joi.string().max(10),
    company: Joi.string().max(50),
    interet: Joi.string().max(10),
  }),
  SchemaOtherInterest = Joi.object({
    interest: Joi.string().max(700).required(),
  });

function validOther(req, res, next) {
  const validation = SchemaOther.validate(req.hubspot),
    interest = req.body.interest,
    validationInterest = SchemaOtherInterest.validate({ interest });

  if (validation.error) {
    console.log(validation.error.details[0].message);
    return res.status(400).json({
      message: "Error 400",
      description: validation.error.details[0].message,
    });
  }

  if (validationInterest.error) {
    console.log(validationInterest.error.details[0].message);
    return res.status(400).json({
      message: "Error 400",
      description: validation.error.details[0].message,
    });
  }
  next();
}

module.exports = validOther;
