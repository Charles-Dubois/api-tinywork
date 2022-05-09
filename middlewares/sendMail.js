require("dotenv").config({ path: "./config.env" });
const path = require("path"),
  nodemailer = require("nodemailer");

function sendMail(req, res, next) {
  if (req.hubspot.interet !== "contact") {
    const transport = nodemailer.createTransport({
        host: "mail.gandi.net",
        service: "tinywork.care",
        auth: { user: "inclusion@tinywork.care", pass: process.env.pass },
      }),
      optionsUser = {
        from: "inclusion@tinywork.care",
        to: req.body.email,
        subject: "1, 2, 3… tinyworkers !",

        attachments: [
          {
            filename: "signature.png",
            path: "public/signature.png",
            cid: "signature@cid",
          },
        ],
        html: `<p>Bonjour ${req.body.firstName},<br /><br /><p>Merci pour votre intérêt dans la création de Tinywork, plus que du coworking, un réseau pour la diversité, l’équité et l’inclusion !<br /><br /></p><p>Vous avez fait votre premier pas vers un lieu de travail solidaire et inclusif. Pour aller plus loin, nous allons vous contacter prochainement pour mieux connaître vos besoins et vous informer de l’état d’avancement de notre ouverture.<br /><br /></p><p>Si vous avez des questions, n’hésitez pas à me contacter ou à prendre RDV ici : https://calendly.com/bourgeois-rachel/30min<br /><br /></p><p>A très vite,<br />Rachel<br /><br /></p><img style='width:250px' src="cid:signature@cid" alt="attachment">`,
      },
      optionsAdmin = {
        from: "inclusion@tinywork.care",
        to: "inclusion@tinywork.care",
        subject: req.mailContentAdmin.subject,
        text: req.mailContentAdmin.message,
      };

    transport.sendMail(optionsUser, (err, infos) => {
      if (err) {
        console.error(err);
        return res.status(400).json({ message: "mail not valid" });
      }
      console.log(infos.response);
    });

    transport.sendMail(optionsAdmin, (err, infos) => {
      if (err) {
        console.error(err);
        return res.status(400).json({ message: "mail not valid" });
      }
      console.log(infos.response);
    });
  }
  next();
}
module.exports = sendMail;
