const express = require("express");
const router = express.Router()

// sample ONLY
const getAllUsers = require('./controllers/sample')
router.get("/get-all-users",getAllUsers); //Sample Only

// sample ONLY
module.exports = router