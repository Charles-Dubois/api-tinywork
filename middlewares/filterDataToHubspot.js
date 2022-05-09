function filterDataToHubspot(req, res, next) {
  // filtre les diplome et les concataine
  let diplomes;
  if (req.body.diploma1) {
    diplomes = req.body.diploma1;
    if (req.body.diploma2) {
      diplomes = `premier diplome : ${req.body.diploma1}  Second diplome  ${req.body.diploma2} `;
    }
    if (req.body.diploma3) {
      diplomes = `premier diplome : ${req.body.diploma1}  Deuxième diplome  ${req.body.diploma2} Troisième diplome  ${req.body.diploma3}`;
    }
  }
  // raccourcis la fonction a appeler plus bas
  const body = req.body,
    adaptedData = {
      //renseigne les champs conforme a Hubspot
      firstname: body.firstName,
      lastname: body.lastName,
      phone: body.phone,
      company: body.company,
      city: body.city,
      email: body.email,
      address: body.address,
      diplome_s_: diplomes,
      industry: body.area,
      domaine_s__d_etudes: body.fieldOfStudies,
      jobtitle: body.jobTitle,
      nombre_d_enfants___12_ans_: body.numberOfChildren,
      numemployees: body.companySize,
      zip: body.zipCode,
      secteur_s__de_recherche_d_emploi: body.preferredField,
    },
    // convertie l'objet en paramètre en array d'array contenant clé , valeur
    asArray = Object.entries(adaptedData),
    // filtre les élément du tableau vide null ou undefined
    filtered = asArray.filter(
      ([key, value]) => value !== "" && value !== null && value !== undefined
    );
  // reforme un objet avec les valeur filtrés
  req.hubspot = Object.fromEntries(filtered);

  if (req.originalUrl.includes("employee")) {
    req.hubspot.interet = "Employee";
  } else if (req.originalUrl.includes("jobseeker")) {
    req.hubspot.interet = "Job seeker";
  } else if (req.originalUrl.includes("company")) {
    req.hubspot.interet = "Company";
  } else if (req.originalUrl.includes("provider")) {
    req.hubspot.interet = "Service provider";
  } else if (req.originalUrl.includes("other")) {
    req.hubspot.interet = "Other";
  }

  next();
}

module.exports = filterDataToHubspot;
