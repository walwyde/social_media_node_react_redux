const express = require("express")
const { check } = require("express-validator")
const router = express.Router()
const controller = require("../../controllers/profile")
const mdlwre = require("../../middleware/index")

router.get('/users', controller.getAllProfiles)

router.get('/user/:id', controller.getProfileById)

router.get("/me", mdlwre.auth, controller.getProfile)

router.post('/me',mdlwre.auth, 
[
  check("status", "what is your employment status?").not().isEmpty(),
  check("skills", "please provide your skills information").not().isEmpty()
], 
controller.newProfile )

router.put('/me', mdlwre.auth, controller.editProfile)

router.put("/experience", 
[
  mdlwre.auth,
  check('title', 'experience title required').not().isEmpty(),
  check('company', 'employer\'s company name is required').not().isEmpty(),
  check('from', 'from when have you been employed?').not().isEmpty()
], controller.addExperience)

router.put("/education", 
[
  mdlwre.auth,
  check('school', 'Institution name is required').not().isEmpty(),
  check('fieldofstudy', 'Field of Study is required').not().isEmpty(),
  check('from', 'Please provide Date When education began').not().isEmpty()
], controller.addEducation)

router.delete('/education/:edu_id', mdlwre.auth, controller.deleteEducation)

router.delete('/experience/:exp_id', mdlwre.auth, controller.deleteExperience)


router.delete('/me', mdlwre.auth, controller.deleteUserProfile)

router.get('/github/:username', controller.getGitRepo)

module.exports = router