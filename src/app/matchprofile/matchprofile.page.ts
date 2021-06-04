/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
import { NotificationsPage } from './../notifications/notifications.page';
import { AuthService } from './../services/auth.service';
import { MatchesPage } from './../matches/matches.page';
import { SearchresultPage } from './../searchresult/searchresult.page';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matchprofile',
  templateUrl: './matchprofile.page.html',
  styleUrls: ['./matchprofile.page.scss'],
})
export class MatchprofilePage implements OnInit {
  uidfrommatch=MatchesPage.matchUid;
  uidfromnofi=NotificationsPage.profileuid;
  uidfromsearch = SearchresultPage.matchUid;
 // matchuid=MatchesPage.matchUid;
 valuefrommatch=MatchesPage.viewvalue;
 valuefromnoti=NotificationsPage.viewnoti;
 matchuid;
  // showpersonal=1;
  // showfamily=0;
  // showedu=0;
  // showpreference=0;
  filledpreference=0;
  filledfamily=0;
  displayImage = '';
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Details={
    name:'',
    age:'',
    height:'',
    marital:'',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    mother_tongue:'',
    caste:'',
    subcaste:'',
    phone:'',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    city:'',state:'',country:'',degree:'',occu:'',contact:'',contact_phone:'',drink:'',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    smoke:'',diet:'',family_type:'',family_status:'',family_value:'',
    preagefrom:'',preageto:'',predegree:'',preoccu:'',precaste:'',preheight:''

  };

  height_to_num = {};



  constructor(private authService: AuthService) { }

  ngOnInit() {
    if(this.uidfrommatch !== '')
    {
      this.matchuid=this.uidfrommatch;
    }
    else if(this.uidfromsearch !== ''){
      this.matchuid=this.uidfromsearch;
    }
    else
    {
      this.matchuid=this.uidfromnofi;
    }

    this.authService.getSetProfileId(this.matchuid).subscribe((msgs)=>{
      if(msgs['id'] !== null){
        this.authService.getProfilePhoto(this.matchuid,msgs['id']).subscribe((msg1)=>{
            this.displayImage = 'data:image/jpeg;base64,' + msg1.body['message'];
        });
      }
      else {
       this.displayImage = './../../assets/icon/profile.png';
      }
    });

    this.authService.getheightrange().subscribe((msg)=>{
      for(let i=1;i<msg[0].length+1;i++){
        this.height_to_num[msg[0][i-1].height] = msg[0][i-1].height_in_num;
      }
    });
    console.log('uid value',this.matchuid);
    console.log('valuefrommatch',this.valuefrommatch);
    console.log('valuefromnoti',this.valuefromnoti);
    this.authService.getBasicDetails(this.matchuid).subscribe((msg)=>{
      const d=new Date();
      const date=msg[0][0].dob.substring(0,4);
      // eslint-disable-next-line radix
      const num=parseInt(date);
      msg[0][0].age=d.getFullYear()-num;
      this.Details.name=msg[0][0].name;this.Details.age=msg[0][0].age;
      this.Details.phone=msg[0][0].phone_num;this.Details.country=msg[0][0].country;
      this.Details.state=msg[0][0].state;this.Details.city=msg[0][0].city;


    });
    this.authService.getPersonalDetails(this.matchuid).subscribe((msg)=>{
      this.Details.height=Object.keys(this.height_to_num).find(key => this.height_to_num[key] === msg[0][0].height);
      this.Details.marital=msg[0][0].marital_status;
      this.Details.caste=msg[0][0].caste;this.Details.subcaste=msg[0][0].subcaste;
      this.Details.mother_tongue=msg[0][0].mother_tongue;


    });
    this.authService.getEduDetails(this.matchuid).subscribe((msg)=>{
      this.Details.degree=msg[0][0].highest_degree;
      this.Details.occu=msg[0][0].occupation;

    });
    this.authService.getFamilyDetails(this.matchuid).subscribe((msg)=>{
      if(msg[0][0].family_type!==null)
      {
        this.Details.family_type=msg[0][0].family_type;

      }
      if(msg[0][0].family_value!==null)
      {
        this.Details.family_value=msg[0][0].family_value;
      }
      if(msg[0][0].family_status!==null)
      {
        this.Details.family_status=msg[0][0].family_status;

      }
      if(this.Details.family_status!==''  || this.Details.family_type!=='' || this.Details.family_value!=='')
      {
        this.filledfamily=1;
      }

    });
    this.authService.getOtherDetails(this.matchuid).subscribe((msg)=>{
      this.Details.smoke=msg[0][0].smoke;
      this.Details.smoke=msg[0][0].drink;
      this.Details.diet=msg[0][0].diet;

    });
    this.authService.getPartnerDetails(this.matchuid).subscribe((msg)=>{
      if(msg[0][0].age_from!==null)
      {
        this.Details.preagefrom=msg[0][0].age_from;

      }
      if(msg[0][0].age_to!==null)
      {
        this.Details.preageto=msg[0][0].age_to;

      }
      if(msg[0][0].height!==null)
      {
        this.Details.height=Object.keys(this.height_to_num).find(key => this.height_to_num[key] === msg[0][0].height);

      }
      if(msg[0][0].caste!==null)
      {
        this.Details.precaste=msg[0][0].caste;

      }
      if(msg[0][0].highest_degree!==null)
      {
        this.Details.predegree=msg[0][0].highest_degree;

      }
      if(msg[0][0].occupation!==null)
      {
        this.Details.preoccu=msg[0][0].occupation;

      }
      if(this.Details.preagefrom!=='' || this.Details.preageto!=='' || this.Details.preheight!==''||
      this.Details.precaste!=='' || this.Details.predegree!=='' || this.Details.preoccu!=='')
      {
        this.filledpreference=1;
      }


    });
    this.authService.getContactDetails(this.matchuid).subscribe((msg)=>{
      this.Details.contact=msg[0][0].person_type1;
      this.Details.contact_phone=msg[0][0].person_type1_num1;
    });
    //console.log(this.Details);
   // console.log(this.Details.family_status);



  }
  // personal(){
  //   console.log(this.Details);
  //   this.showfamily=0;
  //   this.showpersonal=1;
  //   this.showedu=0;
  //   this.showpreference=0;
  // }
  // education(){
  //   this.showfamily=0;
  //   this.showpersonal=0;
  //   this.showedu=1;
  //   this.showpreference=0;
  // }
  // family(){
  //   this.showfamily=1;
  //   this.showpersonal=0;
  //   this.showedu=0;
  //   this.showpreference=0;

  // }

  // preference(){
  //   console.log(this.Details);
  //   this.showfamily=0;
  //   this.showpersonal=0;
  //   this.showedu=0;
  //   this.showpreference=1;

  // }

}
