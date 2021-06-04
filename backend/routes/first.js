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
  body('subcaste'),
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
router.get('/getsalaryscale',authController.getsalaryscale);
router.get('/getheightrange',authController.getheightrange);

router.get('/getBasicDetails/:uid',authController.getBasicDetails);
router.put('/putBasicDetails',authController.putBasicDetails);

router.get('/getPersonalDetails/:uid',authController.getPersonalDetails);
router.put('/putPersonalDetails',authController.putPersonalDetails);

router.get('/getEduDetails/:uid',authController.getEduDetails);
router.put('/putEduDetails',authController.putEduDetails);

router.get('/getPartnerDetails/:uid',authController.getPartnerDetails);
router.put('/putPartnerDetails',authController.putPartnerDetails);

router.get('/getFamilyDetails/:uid',authController.getFamilyDetails);
router.put('/putFamilyDetails',authController.putFamilyDetails);

router.get('/getContactDetails/:uid',authController.getContactDetails);
router.put('/putContactDetails',authController.putContactDetails);

router.get('/getOtherDetails/:uid',authController.getOtherDetails);
router.put('/putOtherDetails',authController.putOtherDetails);

router.get('/getSearchDetails/:uid',authController.getSearchDetails);
router.put('/putSearchDetails',authController.putSearchDetails);

router.put('/getSearch',authController.getSearch);

router.get('/fetchSearchResult/:uid',authController.fetchSearchResult);

router.get('/getGender/:uid',authController.getGender);

router.get('/fetchAllMale',authController.fetchAllMale);

router.get('/fetchAllFemale',authController.fetchAllFemale);

router.post('/requests/:from/:to',authController.saverequest);

router.get('/fetchrequests/:to',authController.fetchrequests);

router.get('/onerequest/:from',authController.onerequest);

router.post('/likes/:from/:to',authController.savelikes);

router.get('/fetchlikes/:to',authController.fetchlikes);

router.get('/onelike/:from',authController.onelike);

router.post('/chatrequests',authController.savechatrequest);
router.get('/showchatrequests/:uid',authController.showchatrequests);
router.put('/acceptchatrequest',authController.acceptchatrequest);
router.delete('/deletechatrequest/:uid',authController.deletechatrequest);
router.get('/getchatrequest/:uid',authController.getchatrequest);

router.get('/image/:uid',authController.image);
router.post('/uploadblob',authController.uploadblob);
router.delete('/deleteImage/:id',authController.deleteImage);
router.put('/updateSetProfile',authController.updateSetProfile);
router.get('/imageCount/:uid',authController.imageCount);
router.get('/getProfilePhoto/:uid/:id',authController.getProfilePhoto);
router.get('/getSetProfileId/:uid',authController.getSetProfileId);


router.delete('/dislike/:from/:to',authController.dislike);
router.delete('/unsendinterest/:from/:to',authController.unsendinterest);
router.get('/verifyemail/:mail',authController.verifyemail);
router.get('/verifyuid/:uid',authController.verifyuid);


router.get('/getcountrynames',authController.getcountrynames);
router.get('/getstatenames/:id',authController.getstatenames);
router.get('/getcitynames/:id',authController.getcitynames);

module.exports=router;
