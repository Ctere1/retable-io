const router = require('express').Router();

const { createDB } = require('../controllers/dataBaseController');

/**
 * DB creating steps:
 * 1-Create a workspace in Retable-io 
 * 2-Create a project under the given Workspace with a default Retable
 * 3-Create a retable under a specific Project
 */
router.post("/", createDB)

module.exports = router