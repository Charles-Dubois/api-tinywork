require("dotenv").config({ path: "./config.env" });
const path = require("path"),
  nodemailer = require("nodemailer");

function mailToContact(req, res, next) {
  if (req.hubspot.interet === "contact") {
    const transport = nodemailer.createTransport({
        host: "mail.gandi.net",
        service: "tinywork.care",
        auth: { user: "contact@tinywork.care", pass: process.env.pass },
      }),
      optionsUser = {
        from: "bonjour@tinywork.care",
        to: req.body.email,
        subject: "Votre première étape pour devenir tinyworker",

        attachments: [
          {
            filename: "signature.png",
            path: "public/signature.png",
            cid: "signature@cid",
          },
        ],
        html: `<p>Bonjour ${req.body.firstName},<br /><br /></p>
      <p>La première étape vers un monde plus inclusif, c’est la curiosité !<br /><br /></p>
      <p>Merci pour votre intérêt dans la création de Tinywork, plus que du coworking, un réseau pour la diversité, l’équité et l’inclusion.<br /><br /></p>
      <p>Nous allons vous répondre très vite. En attendant, si vous avez des questions, n’hésitez pas à me contacter ou à prendre RDV ici : https://calendly.com/bourgeois-rachel/30min<br /><br /></p>
      <p>A très vite,<br />Rachel<br /><br /></p><img style='width:250px' src="cid:signature@cid" alt="attachment">`,
      },
      optionsAdmin = {
        from: "bonjour@tinywork.care",
        to: "contact@tinywork.care",
        subject: req.mailContentAdmin.subject,
        text: req.mailContentAdmin.message,
      };
    try {
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
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "mail not valid" });
    }
  }
  next();
}
module.exports = mailToContact;
