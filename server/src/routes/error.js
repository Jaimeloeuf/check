/**
 * Express Router for error related routes
 * Mounted on /error
 * @author JJ
 * @module Error routes
 */

const express = require("express");
const router = express.Router();
const { asyncWrap } = require("express-error-middlewares");

const fs = require("../utils/fs");
const sendMail = require("../utils/sendMail");

/**
 * Register new error from client
 * @name POST /error/new/
 * @param {Object} error
 * @returns {object} success indicator
 */
router.post(
  "/new",
  express.json(),
  asyncWrap(async (req, res) => {
    const { error, description, time } = req.body;

    // Save error and time into a new doc with a random key
    // https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document
    const errorDoc = await fs
      .collection("errors")
      .add({ error, description, time });

    // Send email to notify developers of error
    // Get the list of developers' email from DB
    const docs = await fs.collection("developers").get();
    for (const doc of docs.docs) {
      // Send out the emails 1 by 1 to all the developers' email accounts
      await sendMail.send({
        to: doc.data().email,
        from: "harryyhoonn@gmail.com",
        subject: `TPTS Error '${errorDoc.id}' reported!`,
        html:
          "Hello developer, a new error has been reported through the app!<br /><br />" +
          `Date and Time: ${time}<br />` +
          `Error ID: ${errorDoc.id}<br />` +
          `Error: ${error}<br />` +
          `Description: ${description}<br />`,
      });
    }

    res.status(201).json({ ok: true });
  })
);

module.exports = router;
