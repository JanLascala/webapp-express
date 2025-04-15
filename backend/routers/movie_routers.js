// basic exports 
const express = require('express');
const router = express.Router();
//export controllers
const movieControllers = require('../controllers/movie_controllers.js')

//index
router.get('/', movieControllers.index);

//show
router.get('/:id', movieControllers.show);

//store
//router.post('/',);

//update
//router.put('/:id');

//patch modify
//router.patch('/:id');

//destroy
//router.delete('(:id');

module.exports = router;
