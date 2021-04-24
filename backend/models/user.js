const db=require('../util/database');


module.exports=class User{
  constructor(uid,name,gender,dob,mail,phone_num,password,country,state,city,
    marital_status,mother_tongue,religion,caste,height,highest_degree,occupation)
    {
      this.uid=uid;
      this.name=name;
      this.gender=gender;
      this.dob=dob;
      this.mail=mail;
      this.phone_num=phone_num;
      this.password=password;
      this.country=country;
      this.state=state;
      this.city=city;
      this.marital_status=marital_status;
      this.mother_tongue=mother_tongue;
      this.religion=religion;
      this.caste=caste;
      this.height=height;
      this.highest_degree=highest_degree;
      this.occupation=occupation;
    }

    static findmail(mail){
      return db.execute(
        'SELECT * FROM basic_details WHERE mail=?',[mail]
      );
    }

    static finduid(uid){
      return db.execute(
        'SELECT * FROM basic_details WHERE uid=?',[uid]
      );

    }


    static savebasic(user){
      console.log('insert');
      return db.execute(
        'INSERT INTO basic_details(uid,name,gender,dob,mail,phone_num,password,country,state,city) VALUES(?,?,?,?,?,?,?,?,?,?)',
        [user.uid,user.name,user.gender,user.dob,user.mail,user.phone_num,user.password,user.country,user.state,user.city],


      );


    }
    static savepersonal(user){
      return db.execute(
        'INSERT INTO personal_details(uid,marital_status,mother_tongue,religion,caste,height) VALUES(?,?,?,?,?,?)',
        [user.uid,user.marital_status,user.mother_tongue,user.religion,user.caste,user.height],

      );
    }

    static saveeducation(user){
      return db.execute(
              'INSERT INTO education_details(uid,highest_degree,occupation) VALUES(?,?,?)',
        [user.uid,user.highest_degree,user.occupation]

      );
    }
}
