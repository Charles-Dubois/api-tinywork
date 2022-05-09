const Joi = require("joi");

const SchemaProvider = Joi.object({
  firstname: Joi.string().max(50).required(),
  lastname: Joi.string().max(50).required(),
  jobtitle: Joi.string().max(50).required(),
  company: Joi.string().max(50).required(),
  address: Joi.string().max(200),
  city: Joi.string().max(50),
  zip: Joi.string().max(10),
  phone: Joi.string().max(20).required(),
  email: Joi.string().email().max(100).required(),
  interet: Joi.string().max(10).required(),
  industry: Joi.string().max(150),
});

function validProvider(req, res, next) {
  const validation = SchemaProvider.validate(req.hubspot);

  if (validation.error) {
    return res.status(400).json({
      message: "Error 400",
      description: validation.error.details[0].message,
    });
  }

  next();
}

module.exports = validProvider;
