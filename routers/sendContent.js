// dependencies
require("dotenv").config({ path: "./config.env" });
const express = require("express"),
  router = express.Router(),
  hubspot = require("@hubspot/api-client"),
  hubspotClient = new hubspot.Client({
    apiKey: process.env.apiKey,
  }),
  //Conditions Joi
  contactJoi = require("../Joi/contactJoi"),
  companyJoi = require("../Joi/companyJoi"),
  jobSeeker = require("../Joi/jobSeekerJoi"),
  employeeJoi = require("../Joi/companyJoi"),
  providerJoi = require("../Joi/providerJoi"),
  otherJoi = require("../Joi/otherJoi"),
  // middlewares
  filterDataToHubspot = require("../middlewares/filterDataToHubspot"),
  filterDataToMailer = require("../middlewares/filterDataToMailer"),
  sendMail = require("../middlewares/sendMail"),
  mailToContact = require("../middlewares/mailToContact");

// @desc add jobSeeker to hubspot and send mail
// @route 	POST /dataform/jobSeeker
// @access 	Public
router.post(
  "/jobseeker",
  filterDataToHubspot,
  jobSeeker,
  filterDataToMailer,
  sendMail,
  async (req, res) => {
    req.hubspot.hubspot_owner_id = parseInt(process.env.owner);

    const contactObj = {
      properties: req.hubspot,
    };
    try {
      await hubspotClient.crm.contacts.basicApi.create(contactObj);
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .json({ description: "This contact already exists" });
    }

    res.status(201).json({ description: "Request done !" });
  }
);

// @desc add company to hubspot and send mail
// @route 	POST /dataform/jobSeeker
// @access 	Public
router.post(
  "/company",
  filterDataToHubspot,
  companyJoi,
  filterDataToMailer,
  sendMail,
  async (req, res) => {
    req.hubspot.hubspot_owner_id = parseInt(process.env.owner);
    const contactObj = {
      properties: req.hubspot,
    };

    try {
      await hubspotClient.crm.contacts.basicApi.create(contactObj);
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ description: "This contact already exists" });
    }

    res.status(201).json({ description: "Request done !" });
  }
);

// @desc add provider to hubspot and send mail
// @route 	POST /dataform/provider
// @access 	Public
router.post(
  "/provider",
  filterDataToHubspot,
  providerJoi,
  filterDataToMailer,
  sendMail,
  async (req, res) => {
    req.hubspot.hubspot_owner_id = parseInt(process.env.owner);
    const contactObj = {
      properties: req.hubspot,
    };
    try {
      await hubspotClient.crm.contacts.basicApi.create(contactObj);
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .json({ description: "This contact already exists" });
    }
    res.status(201).json({ description: "Request done !" });
  }
);

// @desc add employee to hubspot and send mail
// @route 	POST /dataform/employee
// @access 	Public
router.post(
  "/employee",
  filterDataToHubspot,
  employeeJoi,
  filterDataToMailer,
  sendMail,
  async (req, res) => {
    req.hubspot.hubspot_owner_id = parseInt(process.env.owner);
    const contactObj = {
      properties: req.hubspot,
    };
    try {
      await hubspotClient.crm.contacts.basicApi.create(contactObj);
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .json({ description: "This contact already exists" });
    }
    res.status(201).json({ description: "Request done !" });
  }
);

// @desc add other category to hubspot and send mail
// @route 	POST /dataform/employee
// @access 	Public
router.post(
  "/other",
  filterDataToHubspot,
  otherJoi,
  filterDataToMailer,
  sendMail,
  async (req, res) => {
    req.hubspot.hubspot_owner_id = parseInt(process.env.owner);
    const contactObj = {
      properties: req.hubspot,
    };

    try {
      await hubspotClient.crm.contacts.basicApi.create(contactObj);
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .json({ description: "This contact already exists" });
    }
    res.status(201).json({ description: "Request done !" });
  }
);
// @desc send mail to admin and user
// @route 	POST /dataform/contact
// @access 	Public
router.post(
  "/contact",
  filterDataToHubspot,
  contactJoi,
  filterDataToMailer,
  sendMail,
  mailToContact,
  async (_req, res) => {
    res.status(201).json({ description: "Request done !" });
  }
);

module.exports = router;
