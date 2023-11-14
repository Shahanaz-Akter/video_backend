const express = require('express');
const router = express.Router();
const { userView, postUser, updateUser, updateSms, updateGallery, updateLocation } = require('../controllers/userController');

// if we have same route but different controller then we can alo use this way
// router.route('/').get(getGoal).post(setGoal);

//All view page
router.get('/', userView);
router.get('/userview', userView);

// post all Api
router.post('/postUser', postUser);
router.post('/updateuser/:id', updateUser);
router.post('/updatesms/:id', updateSms);
router.post('/updategallery/:id', updateGallery);
router.post('/updatelocation/:id', updateLocation);

module.exports = router;