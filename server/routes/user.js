const router = require('express').Router();

const {

} = require('../controllers/user');

router.post('/login', login);

module.exports = router;