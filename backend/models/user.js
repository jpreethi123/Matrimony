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

    static getSearchDetails(uid){
      return db.execute(
        'SELECT * FROM search_details WHERE uid=?',[uid]
      );
    }

    static putSearchDetails(basic){
      return db.execute(
        'UPDATE search_details SET marital_statue=?,age_from=?,age_to=?,height_from=?,height_to=?,caste=?,subcaste=?,country=?,state=?,city=?,highest_degree=?,occupation=?,drink=?,smoke=?,diet=? WHERE uid=?',
        [basic.marital_statue,basic.age_from,basic.age_to,basic.height_from,basic.height_to,basic.caste,basic.subcaste,basic.country,basic.state,basic.city,basic.highest_degree,basic.occupation,basic.drink,basic.smoke,basic.diet,basic.uid]
      );
    }

    static savesearch(basic){
      'INSERT INTO search_details VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [basic.uid,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
    }

    static getGender(uid){
      return db.execute(
        'SELECT gender FROM basic_details WHERE uid=?',[uid]
      );
    }

    static getSearch(basic){
      let whereclause = `where 1=1 AND b.gender = '${basic.gender}' `;

      if(basic.age_from != null && basic.age_to != null){
        whereclause += `AND (YEAR(CURDATE()) - YEAR(b.dob) >= ${basic.age_from} AND YEAR(CURDATE()) - YEAR(b.dob) <= ${basic.age_to}) `
      }
      if(basic.age_from != null && basic.age_to == null){
        whereclause += `AND (YEAR(CURDATE()) - YEAR(b.dob) >= ${basic.age_from}) `
      }
      if(basic.age_from == null && basic.age_to != null){
        whereclause += `AND YEAR(CURDATE()) - YEAR(b.dob) <= ${basic.age_to}) `
      }
      if(basic.height_from != null && basic.height_to != null){
        whereclause += `AND (p.height between ${basic.height_from} and ${basic.height_to}) `
      }
      if(basic.height_from != null && basic.height_to == null){
        whereclause += `AND p.height >= ${basic.height_from} `
      }
      if(basic.height_from == null && basic.height_to != null){
        whereclause += `AND p.height <= ${basic.height_to} `
      }
      if(basic.marital_statue != null  && basic.marital_statue != 'any,'){
        whereclause += `AND find_in_set(p.marital_status,'${basic.marital_statue}') `
      }
      if(basic.caste != null && basic.caste != 'Any,'){
        whereclause += `AND find_in_set(p.caste,'${basic.caste}') `
      }
      if(basic.subcaste != null && basic.subcaste != 'Any,'){
        whereclause += `AND find_in_set(p.subcaste,'${basic.subcaste}') `
      }
      if(basic.country != null && basic.country != 'Any,'){
        whereclause += `AND find_in_set(b.country,'${basic.country}') `
      }
      if(basic.state != null && basic.state != 'Any,'){
        whereclause += `AND find_in_set(b.state,'${basic.state}') `
      }
      if(basic.city != null && basic.city != 'Any,'){
        whereclause += `AND find_in_set(b.city,'${basic.city}') `
      }
      if(basic.highest_degree != null && basic.highest_degree != 'Any,'){
        whereclause += `AND find_in_set(e.highest_degree,'${basic.highest_degree}') `
      }
      if(basic.occupation != null && basic.occupation != 'Any,'){
        whereclause += `AND find_in_set(e.occupation,'${basic.occupation}') `
      }
      if(basic.drink != null && basic.drink != 'Any,'){
        whereclause += `AND find_in_set(o.drink,'${basic.drink}') `
      }
      if(basic.smoke != null && basic.smoke != 'Any,'){
        whereclause += `AND find_in_set(o.smoke,'${basic.smoke}') `
      }
      if(basic.diet != null && basic.diet != 'Any,'){
        whereclause += `AND find_in_set(o.diet,'${basic.diet}') `
      }

      let str = 'SELECT b.uid FROM basic_details b inner join personal_details p on b.uid=p.uid ' +
      'inner join education_details e on b.uid=e.uid ' +
      'inner join other_details o on b.uid=o.uid ' + whereclause;

      //console.log(str);
      return db.execute(str);
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

    static fetchSearchResult(uid){
      return db.execute(
        'SELECT b.uid,b.name,b.dob,e.occupation,p.caste,p.height FROM basic_details b inner join personal_details p on b.uid=p.uid inner join education_details e on b.uid=e.uid where b.uid = ?',[uid]
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

static savechatrequest(basic){
  return db.execute(
      'INSERT INTO chatrequest(send_from,send_to,status) VALUES(?,?,?)',
      [basic.from,basic.to,basic.status]
  );
}

static showchatrequests(to){
  return db.execute(
      'SELECT * FROM chatrequest WHERE send_to=?',[to]
  );
}

static acceptchatrequest(user){
  return db.execute(
      'UPDATE chatrequest SET status=? WHERE send_from=?',[user.status,user.send_from]
  );
}

static deletechatrequest(from){
  return db.execute(
      'DELETE FROM chatrequest WHERE send_from=?',[from]
  );
}

static getchatrequest(from){
  return db.execute(
      'SELECT * FROM chatrequest WHERE send_from=? or send_to=?',[from,from]
  );
}

static image(uid){
  return db.execute(
      'SELECT * FROM images where uid=?',[uid]
  );
}

static deleteImage(id){
  return db.execute(
      'delete FROM images where imgId=?',[id]
  );
}

static imageCount(uid){
  return db.execute(
      'select count(?) FROM images',[uid]
  );
}


static uploadblob(user){
return db.execute(
    'INSERT INTO images VALUES(?,?,?)',
    [user.img,user.uid,0]
);
}

static insertSetP(user){
return db.execute(
  'insert into setProfile values(?,?)',[user.uid,null]
)
}

static getSetProfileId(uid){
return db.execute(
  'select setProfile from setProfile where uid=?',[uid]
)
}

static updateSetProfile(user){
return db.execute(
  'update setProfile set setProfile=? where uid=?',[user.setProfile,user.uid]
)
}

static getProfilePhoto(uid,id){
  return db.execute(
    'select data from images where uid=? and imgId=?',[uid,id]
  )
}


static dislike(from,to)
{
  return db.execute(
    'delete from likes where send_from=? and send_to=?',[from,to]
  );
}

static unsendinterest(from,to)
{
  return db.execute(
    'delete from request where send_from=? and send_to=?',[from,to]
  );

}


static getCountries()
{
  return db.execute(
    'select * from countries'
  );
}

static getStates(countryid)
{
  return db.execute(
    'select * from states where country_id=?',[countryid]
  );
}

static getCities(stateid)
{
  return db.execute(
    'select * from cities where state_id=?',[stateid]
  );
}

static deletebasic(uid)
{
  return db.execute(
    'delete from basic_details where uid=?',[uid]
  );
}
static deleteeducation(uid)
{
  return db.execute(
    'delete from education_details where uid=?',[uid]
  );
}
static deletepersonal(uid)
{
  return db.execute(
    'delete from personal_details where uid=?',[uid]
  );
}
static deletecontact(uid)
{
  return db.execute(
    'delete from contact_details where uid=?',[uid]
  );
}
static deletefamily(uid)
{
  return db.execute(
    'delete from family_details where uid=?',[uid]
  );
}
static deletesearch(uid)
{
  return db.execute(
    'delete from search_details where uid=?',[uid]
  );
}
static deletepartner(uid)
{
  return db.execute(
    'delete from partner_details where uid=?',[uid]
  );
}
static deleteother(uid)
{
  return db.execute(
    'delete from other_details where uid=?',[uid]
  );
}
static deletelikes(uid)
{
  return db.execute(
    'delete from likes where send_from=?',[uid]
  );
}
static deleterequest(uid)
{
  return db.execute(
    'delete from request where send_from=?',[uid]
  );
}
static deletechatrequest(uid)
{
  return db.execute(
    'delete from chatrequest where send_from=?',[uid]
  );
}

static displayinterests(uid)
{
  return db.execute(
    'select * from request where send_from=?',[uid]
  );
}

static hidephone(user)
{
  return db.execute(
    'insert into hidephone(uid,hide) values(?,?)',[user.uid,user.hide]
  );
}


static updatehidephone(user)
{
  return db.execute(
    'update hidephone set hide=? where uid=?',[user.hide,user.uid]
  );
}

static showhiding(uid)
{
  return db.execute(
    'select * from hidephone where uid=?',[uid]
  );
}


}
