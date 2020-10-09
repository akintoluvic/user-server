const express = require("express");
const router = express.Router();
const { getUsers, getUser, putUser, addUser, deleteUsers } = require('../controllers/users')

router
    .route('/')
    .get(getUsers)
    .post(addUser)

router
    .route('/:id')
    .delete(deleteUsers)    

router
    .route('/:id')
    .get(getUser)
    .put(putUser)



    

module.exports = router;