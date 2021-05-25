/**
 * Express Router for default routes like root and health
 * Mounted on /
 * @author JJ
 * @module Default routes
 */

const express = require("express");
const router = express.Router();

/**
 * Returns a descriptive string
 * @name GET /
 * @returns {String} descriptive string
 */
router.get("/", (req, res) =>
  res.status(200).send("'Bad Numbers' API Service")
);

/**
 * Server health check
 * @name GET /health
 * @returns {Status} 200
 *
 * @notice Use this for both Kubernetes Liveness and Readiness probe.
 * @notice Since all setup function are awaited async funcs, readiness probe can use this
 */
router.get("/health", (req, res) => res.status(200).send("Ok!"));

module.exports = router;
