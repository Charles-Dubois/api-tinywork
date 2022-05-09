function filterContactToMailer(req, res, next) {
    const body = req.body;
    if (body.data) {
      const when = new Date().toLocaleDateString(),
        firstName = "\nPrénom : " + body.firstName,
        lastName = "\nNom : " + body.lastName,
        company = "\nEntreprise : " + body.company,
        email = "\nEmail : " + body.email,
        message = "\nMessage : " + body.message;
     
      const dataArray = [
        when,
        firstName,
        lastName,
        email,
        company,
        message,
      ];
  
      req.mailContentAdmin = {
        email: email,
        date: when,
        firstname: body.firstName,
        lastName: body.lastName,
        message
      };
    }
    next();
  }
  
  module.exports = filterContactToMailer;
  