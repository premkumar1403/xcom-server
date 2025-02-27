const express = require("express")
const router = express.Router();
const handleController = require('../controller/controller')

router.post('/signup', handleController.signup);
router.get('/loggedinuser', handleController.loginuser)
router.post('/createpost', handleController.creaetpost)
router.get('/showpost', handleController.showpost)
router.get('/userpost', handleController.userpost)
router.get('/user', handleController.user)
router.patch('/userupdate/:email', handleController.editprofile)

module.exports = router;