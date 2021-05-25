/**
 * Express Router API for Searching numbers
 * Mounted on /search
 * @author JJ
 * @module Search routes
 */

const express = require("express");
const router = express.Router();
const fs = require("../utils/fs");
const unixseconds = require("unixseconds");
const { asyncWrap } = require("express-error-middlewares");

async function getReasons(number) {
  // Filter for the specific reports and only select the 'reason' field
  const snapshot = await fs
    .collection("reports")
    .where("num", "==", number)
    // .orderBy("time", "desc")
    .select("reason")
    .limit(5) // Limit to top 5 reports
    .get();

  // snapshot.empty --> should be impossible if the num has been reported before
  // @todo Tmp return an array of just the reason strings
  return snapshot.docs.map((doc) => doc.data().reason);
}

// const lastReported = async (number) =>
//   (
//     await fs
//       .collection("reports")
//       .where("num", "==", number)
//       .orderBy("time", "desc")
//       .select("time")
//       .limit(1)
//       .get()
//   ).docs[0].data().time;

/**
 * Search for a number if it is reported before and the reasons for it
 * @name GET /search/:number
 * @returns {Object} true/false indicator, if true, returns an object of reasons and the number of times each reason is selected
 */
router.get(
  "/:number",
  asyncWrap(async (req, res) => {
    const { number } = req.params;

    const doc = await fs.collection("numbers").doc(number).get();

    res.status(200).json({
      ok: true,

      // Return data if number has been reported before
      ...(doc.exists
        ? {
            reported: doc.data().reported,
            // lastReported: await lastReported(number),
            reasons: await getReasons(number),
          }
        : { reported: 0 }),
    });
  })
);

module.exports = router;
