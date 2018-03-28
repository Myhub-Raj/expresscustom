var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');

//router.get('/', user_controller.index);

router.post('/users', user_controller.user_create);


module.exports = router;
