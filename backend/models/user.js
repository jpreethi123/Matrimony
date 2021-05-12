const db=require('../util/database');


module.exports=class User{
  constructor(uid,name,gender,dob,mail,phone_num,password,country,state,city,
    marital_status,mother_tongue,caste,subcaste,height,highest_degree,occupation)
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
      this.caste=caste;
      this.subcaste=subcaste;
      this.height=height;
      this.highest_degree=highest_degree;
      this.occupation=occupation;
    }

    static getMotherTongue(){
      return db.execute(
        'SELECT * FROM mothertongue'
      );
    }

    static getCaste(){
      return db.execute(
        'SELECT * FROM caste'
      );
    }

    static getSubCaste(name){
      return db.execute(
        'SELECT subcaste_name FROM subcaste WHERE caste_name=?',[name]
      );
    }

    static geteducation(){
      return db.execute(
        'SELECT * FROM education'
      );
    }

    static getoccupation(){
      return db.execute(
        'SELECT * FROM occupation'
      );
    }

    static getsalaryscale(){
      return db.execute(
        'SELECT * FROM salaryscale'
      );
    }

    static getheightrange(){
      return db.execute(
        'SELECT * FROM heightrange'
      );
    }

    static getBasicDetails(uid){
      return db.execute(
        'SELECT * FROM basic_details WHERE uid=?',[uid]
      );
    }

    static putBasicDetails(basic){
      return db.execute(
        'UPDATE basic_details SET country=?,state=?,city=? WHERE uid=?',[basic.country,basic.state,basic.city,basic.uid]
      );
    }

    static getPersonalDetails(uid){
      return db.execute(
        'SELECT * FROM personal_details WHERE uid=?',[uid]
      );
    }

    static putPersonalDetails(basic){
      return db.execute(
        'UPDATE personal_details SET marital_status=?,mother_tongue=?,caste=?,subcaste=?,height=?,weight=?,aboutme=? WHERE uid=?',[basic.martialstatu,basic.mothertongue,basic.caste,basic.subcaste,basic.height,basic.weight,basic.aboutme,basic.uid]
      );
    }

    static getEduDetails(uid){
      return db.execute(
        'SELECT * FROM education_details WHERE uid=?',[uid]
      );
    }

    static putEduDetails(basic){
      return db.execute(
        'UPDATE education_details SET highest_degree=?,occupation=?,salary=? WHERE uid=?',[basic.edu,basic.occu,basic.salary,basic.uid]
      );
    }

    static getPartnerDetails(uid){
      return db.execute(
        'SELECT * FROM partner_details WHERE uid=?',[uid]
      );
    }

    static putPartnerDetails(basic){
      return db.execute(
        'UPDATE partner_details SET age_from=?,age_to=?,height=?,mother_tongue=?,highest_degree=?,occupation=?,salary=?,caste=?,subcaste=? WHERE uid=?',[basic.age_from,basic.age_to,basic.height,basic.mother_tongue,basic.highest_degree,basic.occupation,basic.salary,basic.caste,basic.subcaste,basic.uid]
      );
    }

    static getFamilyDetails(uid){
      return db.execute(
        'SELECT * FROM family_details WHERE uid=?',[uid]
      );
    }

    static putFamilyDetails(basic){
      return db.execute(
        'UPDATE family_details SET father_name=?,father_occupation=?,mother_name=?,mother_occupation=?,sibiling=?,family_type=?,family_status=?,family_value=? WHERE uid=?',[basic.father_name,basic.father_occupation,basic.mother_name,basic.mother_occupation,basic.sibling,basic.family_type,basic.family_status,basic.family_value,basic.uid]
      );
    }

    static getContactDetails(uid){
      return db.execute(
        'SELECT * FROM contact_details WHERE uid=?',[uid]
      );
    }

    static putContactDetails(basic){
      return db.execute(
        'UPDATE contact_details SET person_type1=?,person_type1_num1=?,person_type1_num2=?,person_type2=?,person_type2_num1=?,person_type2_num2=?,person_type3=?,person_type3_num1=?,person_type3_num2=? WHERE uid=?',[basic.person_type1,basic.person_type1_num1,basic.person_type1_num2,basic.person_type2,basic.person_type2_num1,basic.person_type2_num2,basic.person_type3,basic.person_type3_num1,basic.person_type3_num2,basic.uid]
      );
    }

    static getOtherDetails(uid){
      return db.execute(
        'SELECT * FROM other_details WHERE uid=?',[uid]
      );
    }

    static putOtherDetails(basic){
      return db.execute(
        'UPDATE other_details SET drink=?,smoke=?,diet=? WHERE uid=?',[basic.drink,basic.smoke,basic.diet,basic.uid]
      );
    }

    static findmail (mail){
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
        'INSERT INTO personal_details(uid,marital_status,mother_tongue,caste,height,weight,aboutme,subcaste) VALUES(?,?,?,?,?,?,?,?)',
        [user.uid,user.marital_status,user.mother_tongue,user.caste,user.height,user.weight,user.aboutme,user.subcaste],

      );
    }

    static saveeducation(user){
      return db.execute(
              'INSERT INTO education_details(uid,highest_degree,occupation,salary) VALUES(?,?,?,?)',
        [user.uid,user.highest_degree,user.occupation,user.salary]

      );
    }

    static savecontact(user){
      return db.execute('INSERT INTO contact_details VALUES(?,?,?,?,?,?,?,?,?,?)',[user.uid,null,null,null,null,null,null,null,null,null]);
    }

    static saveother(user){
      return db.execute('INSERT INTO other_details VALUES(?,?,?,?)',[user.uid,null,null,null]);
    }

    static savepartner(user){
      return db.execute('INSERT INTO partner_details VALUES(?,?,?,?,?,?,?,?,?,?)',[user.uid,null,null,null,null,null,null,null,null,null]);
    }

    static savefamily(user){
      return db.execute('INSERT INTO family_details VALUES(?,?,?,?,?,?,?,?,?)',[user.uid,null,null,null,null,null,null,null,null]);
    }

    static fetchAllMale(){
      return db.execute(
        'SELECT * FROM basic_details,education_details,personal_details WHERE (basic_details.gender="male" OR basic_details.gender="Male")  AND basic_details.uid =education_details.uid AND basic_details.uid=personal_details.uid'
      );
    }

    static fetchAllFemale(){
      return db.execute(
        'SELECT * FROM basic_details,education_details,personal_details WHERE (basic_details.gender="Female" OR basic_details.gender="female")  AND basic_details.uid =education_details.uid AND basic_details.uid=personal_details.uid'
      );
    }



    static saverequest(from,to){
      return db.execute(
          'INSERT INTO request(send_from,send_to) VALUES(?,?)',
          [from,to]
      );
  }

  static showrequests(to){
    return db.execute(
        'SELECT * FROM request WHERE send_to=?',[to]
    );
}

static onerequest(from){
  return db.execute(
      'SELECT send_to FROM request WHERE send_from=?',[from]
  );
}

static savelikes(from,to){
  return db.execute(
      'INSERT INTO likes(send_from,send_to) VALUES(?,?)',
      [from,to]
  );

 }

 static showlikes(to){
  return db.execute(
      'SELECT * FROM likes WHERE send_to=?',[to]
  );
}

static onelike(from){
  return db.execute(
      'SELECT send_to FROM likes WHERE send_from=?',[from]
  );
}



}
