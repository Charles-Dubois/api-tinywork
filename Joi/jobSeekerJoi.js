const Joi = require("joi");

const SchemaJobSeeker = Joi.object({
  firstname: Joi.string().max(50).required(),
  lastname: Joi.string().max(50).required(),
  email: Joi.string().email().max(250).required(),
  phone: Joi.string().max(20),
  address: Joi.string().max(200),
  city: Joi.string().max(50),
  zip: Joi.string().max(10),
  jobtitle: Joi.string().max(50).required(),
  domaine_s__d_etudes: Joi.string().max(100).required(),
  secteur_s__de_recherche_d_emploi: Joi.string().max(200).required(),
  diplome_s_: Joi.string().max(500),
  nombre_d_enfants___12_ans_: Joi.string().max(10),
  interet: Joi.string().max(10).required(),
});

function validJobSeeker(req, res, next) {
  const validation = SchemaJobSeeker.validate(req.hubspot);

  if (validation.error) {
    return res.status(400).json({
      message: "Error 400",
      description: validation.error.details[0].message,
    });
  }

  next();
}

module.exports = validJobSeeker;
