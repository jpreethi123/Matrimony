const express=require('express');

const {body}=require('express-validator');


const router=express.Router()

const User=require('../models/user');
const authController=require('../controllers/first');

router.post('/signup',
[

  body('uid')
  .custom(async (uid)=>{
      const user=await User.finduid(uid);
      if(user[0].length>0){
          return Promise.reject('UID already exists!')

      }
  }),
  body('name').trim().not().isEmpty(),
  body('gender').trim().not().isEmpty(),
  body('dob').trim().not().isEmpty(),
  body('mail').isEmail().withMessage('Please enter a valid email.')
  .custom(async (mail)=>{
      const user=await User.findmail(mail);
      if(user[0].length>0){
          return Promise.reject('Mail ID already exists!')

      }
  })
  .normalizeEmail(),
  body('phone_num').trim().not().isEmpty(),
  body('password').trim().not().isEmpty(),
  body('country').trim().not().isEmpty(),
  body('state').trim().not().isEmpty(),
  body('city').trim().not().isEmpty(),
  body('marital_status').trim().not().isEmpty(),
  body('mother_tongue').trim().not().isEmpty(),
  body('caste').trim().not().isEmpty(),
  body('height').trim().not().isEmpty(),
  body('highest_degree').trim().not().isEmpty(),
  body('occupation').trim().not().isEmpty(),

],authController.signup
);

router.post('/login',authController.login);

router.get('/getMotherTongue',authController.getMotherTongue);
router.get('/getCaste',authController.getCaste);
router.get('/getSubCaste/:name',authController.getSubCaste);
router.get('/geteducation',authController.geteducation);
router.get('/getoccupation',authController.getoccupation);

router.get('/getBasicDetails/:uid',authController.getBasicDetails);
router.put('/putBasicDetails',authController.putBasicDetails);

router.get('/getPersonalDetails/:uid',authController.getPersonalDetails);
//router.put('/putPersonalDetails',authController.putPersonalDetails);

// router.get('/getEduDetails/:uid',authController.getEduDetails);
//router.put('/putEduDetails',authController.putEduDetails);

// router.get('/getPartnerDetails/:uid',authController.getPartnerDetails);
//router.put('/putPartnerDetails',authController.putPartnerDetails);

// router.get('/getFamilyDetails/:uid',authController.getFamilyDetails);
//router.put('/putFamilyDetails',authController.putFamilyDetails);

module.exports=router;
