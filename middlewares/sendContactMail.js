const path = require("path");
import filterContactToMailer from "./filterContactToMailer"
function sendMail(req, res, next) {

    //req.mailContentAdmin.email
    optionsUser = {
      from: "bonjour@tinywork.care",
      to: "charles.dubois.h@gmail.com",
      subject: "1, 2, 3… tinyworkers !",

      attachments: [
        {
          filename: "signature.png",
          path: "public/signature.png",
          cid: "signature@cid",
        },
      ],
      html: `<p>Bonjour ${req.mailContentAdmin.firstname},<br /><br /><p>Merci pour votre intérêt dans la création de Tinywork, plus que du coworking, un réseau pour la diversité, l’équité et l’inclusion !
      <br /><br /></p>
      <p>Vous avez fait votre premier pas vers un lieu de travail solidaire et inclusif. Pour aller plus loin, nous allons vous contacter prochainement pour mieux connaître vos besoins et vous informer de l’état d’avancement de notre ouverture.<br /><br />
      </p>
      <p>Si vous avez des questions, n’hésitez pas à me contacter ou à prendre RDV ici : https://calendly.com/bourgeois-rachel/30min<br /><br /></p>
<p>A très vite,
<br />Rachel</p>
      </p><img style='width:250px' src="cid:signature@cid" alt="attachment">`,
    },
    optionsAdmin = {
      from: "inclusion@tinywork.care",
      to: "inclusion@tinywork.care",
      subject: ` Votre première étape pour devenir tinyworker
      : ${req.hubspot.interet}, le ${req.mailContentAdmin.date}.`,
      text: req.mailContentAdmin.message,
    };

  transport.sendMail(optionsUser, (err, infos) => {
    if (err) {
      console.error(err);
      return res.json({ message: "bad request" });
    }
    console.log("sent" + infos.response);
  });
  transport.sendMail(optionsAdmin, (err, infos) => {
    if (err) {
      console.error(err);
      return res.json({ message: "bad request" });
    }
    console.log("sent" + infos.response);
  });
  next();
}
module.exports = sendMail;
