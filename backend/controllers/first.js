const {validationResult} =require('express-validator');

const jwt=require('jsonwebtoken');

const User=require('../models/user');



exports.signup = async(req,res,next)=>{
  const errors=validationResult(req);

  console.log(errors);
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
  const religion=req.body.religion;
  const caste=req.body.caste;
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
      religion:religion,
      caste:caste,
      height:height,

    }

    const usereducation={
      uid:uid,
      highest_degree:highest_degree,
      occupation:occupation

    }
    // console.log('userdetails '+ userDetails);
    // const result=await User.save(userDetails);
    const user=await User.findmail(mail);
    if(user[0].length === 1){
      const error=new Error('User with this email already exists')
      error.statusCode=402;
      throw error;


    }
    const user1=await User.finduid(uid);
    if(user1[0].length === 1){
      // res.status(401).json({message:'User with this email could not be found'});
      const error=new Error('User with this uid already exists')
      error.statusCode=410;
      throw error;


    }




    const result1=await User.savebasic(userbasic);
    const result2=await User.savepersonal(userpersonal);
    const result3=await User.saveeducation(usereducation);




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
