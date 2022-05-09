function filterDataToMailer(req, res, next) {
  const body = req.body;
  const when = new Date().toLocaleDateString(),
    firstname = "\nPrénom : " + body.firstName,
    lastname = "\nNom : " + body.lastName,
    email = "\nemail : " + body.email;

  const dataArray = [when, firstname, lastname, email];
  if (body.phone) {
    const phone = "\nNuméro de téléphone :" + body.phone;
    dataArray.push(phone);
  }
  if (body.booking) {
    const cityBooking = "\nVille(s) de coworking : " + body.cityBooking,
      date = "\nDate de commencement : " + body.date,
      formule = body.formule && "\nDurée selectionnée : " + body.formule;
    dataArray.push(cityBooking, date, formule);

    let services = "\nAucun service selectionné dans la liste";
    if (body.services.length > 0) {
      services = "\nServices souhaités : " + body.services;
    }
    dataArray.push(services);
    if (body.otherService) {
      const otherService = "\nAutres services souhaités : " + body.otherService;
      dataArray.push(otherService);
    }
    if (body.otherCity) {
      const otherCity = "\nAutres ville de coworking :" + body.otherCity;
      dataArray.push(otherCity);
    }
    if (body.numberOfPost) {
      const numberOfPost = "\nNombres de poste souhaités :" + body.numberOfPost;
      dataArray.push(numberOfPost);
    }
  }
  if (body.interest) {
    const interest = "\nDescritpion de l'interêt :\n" + body.interest;
    dataArray.push(interest);
  }

  req.mailContentAdmin = {
    email: email,
    date: when,
    firstname: body.firstName,
    subject: `Formulaire : ${req.hubspot.interet}, rempli le ${when}.`,
    message: "Voici les informations : \nDate de création : " + dataArray,
  };

  if (body.booking) {
    req.mailContentAdmin.subject = `Pré réservation : ${req.hubspot.interet}, le ${when}.`;
    req.mailContentAdmin.message =
      "Voici les informations de la pré réservation : \nDate de création : " +
      dataArray;
  }
  if (body.textMessage) {
    req.mailContentAdmin.subject = `Formulaire de contact rempli, le ${when}.`;
    const textMessage = `Message de contact : \n + ${body.textMessage}`;
    dataArray.push(textMessage);
    req.mailContentAdmin.message =
      "Voici le formulaire de contact : \nDate de création : " + dataArray;
  }
  next();
}

module.exports = filterDataToMailer;
