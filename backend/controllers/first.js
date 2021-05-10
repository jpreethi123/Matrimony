const {validationResult} =require('express-validator');

const jwt=require('jsonwebtoken');

const User=require('../models/user');



exports.signup = async(req,res,next)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty()) return;

  const uid=req.body.uid;
  const name=req.body.name;
  const gender=req.body.gender;
  const dob=req.body.dob;
  const mail=req.body.mail;
  const phone_num=req.body.phone_num;
  const password=req.body.password;
  const country=req.body.country;
  const state=req.body.state;
  const city=req.body.city;
  const marital_status=req.body.marital_status;
  const mother_tongue=req.body.mother_tongue;
  const caste=req.body.caste;
  const subcaste=req.body.subcaste;
  const height=req.body.height;
  const highest_degree=req.body.highest_degree;
  const occupation=req.body.occupation;

  try{
    // const userDetails={
    //   uid:uid,
    //   name:name,
    //   gender:gender,
    //   dob:dob,
    //   mail:mail,
    //   phone_num:phone_num,
    //   password:password,
    //   country:country,
    //   state:state,
    //   city:city,
    //   marital_status:marital_status,
    //   mother_tongue:mother_tongue,
    //   religion:religion,
    //   caste:caste,
    //   height:height,
    //   highest_degree:highest_degree,
    //   occupation:occupation

    // };

    const userbasic={
      uid:uid,
      name:name,
      gender:gender,
      dob:dob,
      mail:mail,
      phone_num:phone_num,
      password:password,
      country:country,
      state:state,
      city:city,

    }

    const userpersonal={
      uid:uid,
      marital_status:marital_status,
      mother_tongue:mother_tongue,
      caste:caste,
      subcaste:subcaste,
      height:height,

    }

    const usereducation={
      uid:uid,
      highest_degree:highest_degree,
      occupation:occupation

    }
    const user=await User.findmail(mail);
    if(user[0].length === 1){
      const error=new Error('User with this email already exists')
      error.statusCode=402;
      throw error;
    }
    const user1=await User.finduid(uid);
    if(user1[0].length === 1){
      const error=new Error('User with this uid already exists')
      error.statusCode=410;
      throw error;
    }

    const usercontact={
      uid:uid
    }
    const userfamily={
      uid:uid
    }
    const userother={
      uid:uid
    }
    const userpartner={
      uid:uid
    }


    const result1=await User.savebasic(userbasic);
    const result2=await User.savepersonal(userpersonal);
    const result3=await User.saveeducation(usereducation);
    const r4 = await User.savecontact(usercontact);
    const r5 = await User.savefamily(userfamily);
    const r6 = await User.saveother(userother);
    const r7 = await User.savepartner(userpartner);



    // console.log(result);

    res.status(200).json({message:'User registered'});

  }catch(err){
    console.log(err);
    if(!err.statusCode){
      err.statusCode=500;
    }
    next(err);
  }


};

exports.login=async(req,res,next)=>{
  const mail=req.body.mail;
  //const password=cryptr.decrypt(req.body.password);
//const password=md5(req.body.password);
//const password=req.body.password;
const password=req.body.password;

try{
const user=await User.findmail(mail);
if(user[0].length !== 1){
  // res.status(401).json({message:'User with this email could not be found'});
  const error=new Error('User with this email could not be found')
  error.statusCode=401;
  throw error;


}

const storedUser=user[0][0];
//console.log(storedUser.password);
//console.log('password ',password);
// const isEqual = await bcrypt.compare(password,storedUser.password);
var isEqual=false;
if(storedUser.password===password)
{
  isEqual=true;
}

console.log(isEqual);

if(!isEqual){
  const error=new Error('Wrong Password');
  error.statusCode=403;
  console.log('wrong password');
   res.status(403).json({message:'Wrong password'});
  throw error;

}

const token=jwt.sign(
  {
      mail:storedUser.mail,
      userId:storedUser.uid
  },
  'secretfortoken',
  {expiresIn:'1h'}
);



res.status(200).json({token:token,userId:storedUser.uid});

} catch(err){
if(!err.statusCode){
  err.statusCode=500;
}
next(err);

}

};

exports.getMotherTongue=async(req,res,next)=>{
  try{
    const user=await User.getMotherTongue();
    res.status(200).json(user);
  }
  catch(err){
    console.log(err.message);
  }
};

exports.getCaste=async(req,res,next)=>{
  try{
    const user=await User.getCaste();
    res.status(200).json(user);
  }
  catch(err){
    console.log(err.message);
  }
};

exports.getSubCaste=async(req,res,next)=>{
  const name=req.params.name;
  try{
    const user=await User.getSubCaste(name);
    res.status(200).json(user);
  }
  catch(err){
   console.log(err.message);
  }
};

exports.geteducation=async(req,res,next)=>{
  try{
    const user=await User.geteducation();
    res.status(200).json(user);
  }
  catch(err){
    console.log(err.message);
  }
};

exports.getoccupation=async(req,res,next)=>{
  try{
    const user=await User.getoccupation();
    res.status(200).json(user);
  }
  catch(err){
    console.log(err.message);
  }
};




exports.getBasicDetails=async(req,res,next)=>{
  const uid=req.params.uid;
  //console.log("uid "+uid);
  try{
    const user=await User.getBasicDetails(uid);
    res.status(200).json(user);
  }
  catch(err){
   console.log(err.message);
  }
};

exports.putBasicDetails=async(req,res,next)=>{
  const basic = {
   uid: req.body.uid,
   country: req.body.country,
   state: req.body.state,
   city: req.body.city
  }
  //console.log("basic "+basic);
  try{
    const user=await User.putBasicDetails(basic);
    res.status(200).json(user);
  }
  catch(err){
   console.log(err.message);
  }
};

exports.getPersonalDetails=async(req,res,next)=>{
  const uid=req.params.uid;
  //console.log("uid "+uid);
  try{
    const user=await User.getPersonalDetails(uid);
    res.status(200).json(user);
  }
  catch(err){
   console.log(err.message);
  }
};

// exports.getEduDetails=async(req,res,next)=>{
//   const uid=req.params.uid;
//   console.log("uid "+uid);
//   try{
//     const user=await User.getEduDetails(uid);
//     res.status(200).json(user);
//   }
//   catch(err){
//    console.log(err.message);
//   }
// };

// exports.getPartnerDetails=async(req,res,next)=>{
//   const uid=req.params.uid;
//   console.log("uid "+uid);
//   try{
//     const user=await User.getPartnerDetails(uid);
//     res.status(200).json(user);
//   }
//   catch(err){
//    console.log(err.message);
//   }
// };

// exports.getFamilyDetails=async(req,res,next)=>{
//   const uid=req.params.uid;
//   console.log("uid "+uid);
//   try{
//     const user=await User.getFamilyDetails(uid);
//     res.status(200).json(user);
//   }
//   catch(err){
//    console.log(err.message);
//   }
// };

exports.fetchAllMale=async(req,res,next)=>{
  //console.log("uid "+uid);
  try{
    const user=await User.fetchAllMale();
    res.status(200).json(user);
  }
  catch(err){
   console.log(err.message);
  }
};

exports.fetchAllFemale=async(req,res,next)=>{
  //console.log("uid "+uid);
  try{
    const user=await User.fetchAllFemale();
    res.status(200).json(user);
  }
  catch(err){
   console.log(err.message);
  }
};



