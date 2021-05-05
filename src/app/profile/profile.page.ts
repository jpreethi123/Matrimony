import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { AlertController, IonSlides, LoadingController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { CountriesService } from '../countries.service';
import { AuthService } from '../services/auth.service';
import { SigninPage} from '../signin/signin.page';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @ViewChild('mySlider')  slides: IonSlides;

  uid=SigninPage.siginUid;
  cont;

  public slideTwoForm: FormGroup;
  public slideThreeForm: FormGroup;
  public slideFourForm: FormGroup;
  public slideFiveForm: FormGroup;
  public slideSixForm: FormGroup;

  public stateInfo: any[] = [];
  public countryInfo: any[] = [];
  public cityInfo: any[] = [];
  cities = [];

  public submitAttempt = false;
  userbasicdetails = {};

  mt = [];
  caste = [];
  subcaste = [];
  edu = [];
  occ = [];

  // eslint-disable-next-line @typescript-eslint/naming-convention
  // selected_mt = null;
  // motherTongue=[{id:1,name:'Assamese'},{id:2,name:'Bangla'},{id:3,name:'Bodo'},
  // {id:4,name:'Dogri'},{id:5,name:'Gujarati'},{id:6,name:'Hindi'},
  // {id:7,name:'Kashmiri'},{id:8,name:'Kannada'},{id:9,name:'Konkani'},
  // {id:10,name:'Maithili'},{id:11,name:'Malayalam'},{id:12,name:'Manipuri'},
  // {id:13,name:'Marathi'},{id:14,name:'Nepali'},{id:15,name:'Oriya'},
  // {id:16,name:'Punjabi'},{id:17,name:'Tamil'},{id:18,name:'Telugu'},
  // {id:19,name:'Santali'},{id:20,name:'Sindhi'},{id:21,name:'Urdu'}
  // ];

  // selectedpre= null;
  // motherTongue1=[{id:1,name:'Assamese'},{id:2,name:'Bangla'},{id:3,name:'Bodo'},
  // {id:4,name:'Dogri'},{id:5,name:'Gujarati'},{id:6,name:'Hindi'},
  // {id:7,name:'Kashmiri'},{id:8,name:'Kannada'},{id:9,name:'Konkani'},
  // {id:10,name:'Maithili'},{id:11,name:'Malayalam'},{id:12,name:'Manipuri'},
  // {id:13,name:'Marathi'},{id:14,name:'Nepali'},{id:15,name:'Oriya'},
  // {id:16,name:'Punjabi'},{id:17,name:'Tamil'},{id:18,name:'Telugu'},
  // {id:19,name:'Santali'},{id:20,name:'Sindhi'},{id:21,name:'Urdu'}
  // ];

//   select=null;
// education=[{id:101,name:'B.E/B.Tech'},{id:102,name:'BCA'},{id:103,name:'Bsc IT'},
// {id:104,name:'B Arch'},{id:105,name:'ME/MTech'},{id:106,name:'MS'},{id:107,name:'MCA'},
// {id:108,name:'Msc/IT'},{id:109,name:'M Arch'},{id:110,name:'MBBS'},{id:111,name:'BDS'},
// {id:112,name:'BPT'},{id:113,name:'BPharm'},{id:114,name:'BSc Nursing'},{id:115,name:'BAMS'},
// {id:116,name:'BHMS'},{id:117,name:'BUMS'},{id:118,name:'MD/MS'},{id:119,name:'MDS'},
// {id:120,name:'MPT'},{id:121,name:'Mpharm'},{id:122,name:'MVSc'},{id:123,name:'CA'},
// {id:124,name:'BCom'},{id:125,name:'Mcom'},{id:126,name:'BBA'},{id:127,name:'MBA'},
// {id:128,name:'LLB'},{id:129,name:'LLM'},{id:130,name:'BA'},{id:131,name:'BSc'},
// {id:132,name:'BEd'},{id:133,name:'PhD'},{id:134,name:'Diploma'},{id:135,name:'High School'},
// {id:136,name:'Higher Secondary'}];

// selectpre=null;
// education1=[{id:101,name:'B.E/B.Tech'},{id:102,name:'BCA'},{id:103,name:'Bsc IT'},
// {id:104,name:'B Arch'},{id:105,name:'ME/MTech'},{id:106,name:'MS'},{id:107,name:'MCA'},
// {id:108,name:'Msc/IT'},{id:109,name:'M Arch'},{id:110,name:'MBBS'},{id:111,name:'BDS'},
// {id:112,name:'BPT'},{id:113,name:'BPharm'},{id:114,name:'BSc Nursing'},{id:115,name:'BAMS'},
// {id:116,name:'BHMS'},{id:117,name:'BUMS'},{id:118,name:'MD/MS'},{id:119,name:'MDS'},
// {id:120,name:'MPT'},{id:121,name:'Mpharm'},{id:122,name:'MVSc'},{id:123,name:'CA'},
// {id:124,name:'BCom'},{id:125,name:'Mcom'},{id:126,name:'BBA'},{id:127,name:'MBA'},
// {id:128,name:'LLB'},{id:129,name:'LLM'},{id:130,name:'BA'},{id:131,name:'BSc'},
// {id:132,name:'BEd'},{id:133,name:'PhD'},{id:134,name:'Diploma'},{id:135,name:'High School'},
// {id:136,name:'Higher Secondary'}];


selectsal=null;
salary=[{id:1,name:'less than 50000'},{id:2,name:'50000-1 lakh'},{id:3,name:'1 lakh-1.5 lakh'},{id:4,name:'1.5 lakh-2 lakh'},
{id:5,name:'2 lakh-2.5 lakh'},{id:6,name:'2.5 lakh-3 lakh'},{id:7,name:'3 lakh- 4 lakh'},{id:8,name:'4 lakh-5 lakh'},
{id:9,name:'5 lakh-6 lakh'},{id:10,name:'6 lakh-7 lakh'},{id:11,name:'7 lakh-8 lakh'},{id:12,name:'8 lakh-9 lakh'},
{id:13,name:'9 lakh-10 lakh'},{id:14,name:'10 lakh-12 lakh'},{id:15,name:'12 lakh-15 lakh'},{id:16,name:'15 lakh-20 lakh'},
{id:17,name:'20 lakh-25 lakh'},{id:18,name:'25 lakh-30 lakh'},{id:19,name:'30 lakh-50 lakh'},{id:20,name:'above 50 lakh'}];

selectsalpre=null;
salary1=[{id:1,name:'less than 50000'},{id:2,name:'50000-1 lakh'},{id:3,name:'1 lakh-1.5 lakh'},{id:4,name:'1.5 lakh-2 lakh'},
{id:5,name:'2 lakh-2.5 lakh'},{id:6,name:'2.5 lakh-3 lakh'},{id:7,name:'3 lakh- 4 lakh'},{id:8,name:'4 lakh-5 lakh'},
{id:9,name:'5 lakh-6 lakh'},{id:10,name:'6 lakh-7 lakh'},{id:11,name:'7 lakh-8 lakh'},{id:12,name:'8 lakh-9 lakh'},
{id:13,name:'9 lakh-10 lakh'},{id:14,name:'10 lakh-12 lakh'},{id:15,name:'12 lakh-15 lakh'},{id:16,name:'15 lakh-20 lakh'},
{id:17,name:'20 lakh-25 lakh'},{id:18,name:'25 lakh-30 lakh'},{id:19,name:'30 lakh-50 lakh'},{id:20,name:'bove 50 lakh'}];

// selectocc=null;
// occupation=[{id:201,name:'Banking professional'},{id:202,name:'Chartered Accountant'},{id:203,name:'Company Secretary'},
// {id:204,name:'Bank Employee'},
// {id:205,name:'Actor'},{id:206,name:'Event Manager'},{id:207,name:'Journalist'},{id:208,name:'Media Preofessional'},
// {id:209,name:'Farming'},{id:210,name:'Agriculture Professional'},{id:211,name:'Horticulturist'},{id:212,name:'Air Hostess'},
// {id:213,name:'Pilot'},{id:214,name:'other airline professional'},{id:215,name:'Architect'},{id:216,name:'Interior Design'},
// {id:217,name:'Animator'},{id:218,name:'Web/Ux designers'},{id:219,name:'Beautician'},{id:220,name:'Fashion Designer'},
// {id:221,name:'HairStylist'},{id:222,name:'jewellery designer'},{id:223,name:'IAS/IRS/IES/IFS'},{id:224,name:'IPS'},
// {id:225,name:'Airforce'},{id:226,name:'Army'},{id:227,name:'Navy'},{id:228,name:'Defence services'},
// {id:229,name:'Teacher'},{id:230,name:'Lecturer'},{id:231,name:'Professor'},{id:232,name:'Researceher'},
// {id:233,name:'Software Engineer'},{id:234,name:'Civil Engineer'},{id:235,name:'Mechanical Engineer'},{id:236,name:'Electrical Engineer'},
// {id:237,name:'Non IT Engineer'},{id:238,name:'Chef'},{id:239,name:'Hotel/Hospitality Professional'},{id:240,name:'Software Developer'},
// {id:241,name:'Software Consultant'},{id:242,name:'Lawyer'},{id:243,name:'Legal Assistant'},{id:244,name:'Legal Professional'},
// {id:245,name:'Dentist'},{id:246,name:'Doctor'},{id:247,name:'Medical Transcriptionist'},{id:248,name:'Nurse'},
// {id:249,name:'Pharmacist'},{id:250,name:'Physiotherapist'},{id:251,name:'Surgeon'},{id:252,name:'Psychologist'},
// {id:253,name:'Veterinary Doctor'},{id:254,name:'Therapist'},{id:255,name:'Marketubg Professional'},{id:256,name:'sales professional'},
// {id:257,name:'Biologist'},{id:258,name:'Botanist'},{id:259,name:'Agent/Contractor/broker'},{id:260,name:'Bussiness owner'},
// {id:261,name:'Politician'},{id:262,name:'Sportsman/SportsWomen'},{id:263,name:'Writer'},{id:264,name:'Travel/Transport Professional'},

// ];


// selectoccpre=null;
// occupation1=[{id:201,name:'Banking professional'},{id:202,name:'Chartered Accountant'},{id:203,name:'Company Secretary'},
// {id:204,name:'Bank Employee'},
// {id:205,name:'Actor'},{id:206,name:'Event Manager'},{id:207,name:'Journalist'},{id:208,name:'Media Preofessional'},
// {id:209,name:'Farming'},{id:210,name:'Agriculture Professional'},{id:211,name:'Horticulturist'},{id:212,name:'Air Hostess'},
// {id:213,name:'Pilot'},{id:214,name:'other airline professional'},{id:215,name:'Architect'},{id:216,name:'Interior Design'},
// {id:217,name:'Animator'},{id:218,name:'Web/Ux designers'},{id:219,name:'Beautician'},{id:220,name:'Fashion Designer'},
// {id:221,name:'HairStylist'},{id:222,name:'jewellery designer'},{id:223,name:'IAS/IRS/IES/IFS'},{id:224,name:'IPS'},
// {id:225,name:'Airforce'},{id:226,name:'Army'},{id:227,name:'Navy'},{id:228,name:'Defence services'},
// {id:229,name:'Teacher'},{id:230,name:'Lecturer'},{id:231,name:'Professor'},{id:232,name:'Researceher'},
// {id:233,name:'Software Engineer'},{id:234,name:'Civil Engineer'},{id:235,name:'Mechanical Engineer'},{id:236,name:'Electrical Engineer'},
// {id:237,name:'Non IT Engineer'},{id:238,name:'Chef'},{id:239,name:'Hotel/Hospitality Professional'},{id:240,name:'Software Developer'},
// {id:241,name:'Software Consultant'},{id:242,name:'Lawyer'},{id:243,name:'Legal Assistant'},{id:244,name:'Legal Professional'},
// {id:245,name:'Dentist'},{id:246,name:'Doctor'},{id:247,name:'Medical Transcriptionist'},{id:248,name:'Nurse'},
// {id:249,name:'Pharmacist'},{id:250,name:'Physiotherapist'},{id:251,name:'Surgeon'},{id:252,name:'Psychologist'},
// {id:253,name:'Veterinary Doctor'},{id:254,name:'Therapist'},{id:255,name:'Marketubg Professional'},{id:256,name:'sales professional'},
// {id:257,name:'Biologist'},{id:258,name:'Botanist'},{id:259,name:'Agent/Contractor/broker'},{id:260,name:'Bussiness owner'},
// {id:261,name:'Politician'},{id:262,name:'Sportsman/SportsWomen'},{id:263,name:'Writer'},{id:264,name:'Travel/Transport Professional'},

// ];

heightsel=null;

heightRange=[{id:1,h:'4ft 5'},{id:2,h:'4ft 6'},{id:3,h:'4ft 7'},{id:4,h:'4ft 8'},{id:5,h:'4ft 9'},
{id:6,h:'4ft 10'},{id:7,h:'4ft 11'},{id:8,h:'5ft'},{id:9,h:'5ft 1'},{id:10,h:'5ft 2'},
{id:11,h:'5ft 3'},{id:12,h:'5ft 4'},{id:13,h:'5ft 5'},{id:14,h:'5ft 6'},{id:15,h:'5ft 7'},
{id:16,h:'5ft 8'},{id:17,h:'5ft 9'},{id:18,h:'5ft 10'},{id:19,h:'5ft 11'},{id:20,h:'6ft'},
{id:21,h:'6ft 1'},{id:22,h:'6ft 2'},{id:23,h:'6ft 3'},{id:24,h:'6ft 4'},{id:25,h:'6ft 5'},
{id:26,h:'6ft 6'},{id:27,h:'6ft 7'},{id:28,h:'6ft 8'},{id:29,h:'6ft 9'},{id:30,h:'6ft 10'},
{id:31,h:'6ft 11'},{id:32,h:'7ft'}];


heightselpre=null;

heightRange1=[{id:1,h:'4ft 5'},{id:2,h:'4ft 6'},{id:3,h:'4ft 7'},{id:4,h:'4ft 8'},{id:5,h:'4ft 9'},
{id:6,h:'4ft 10'},{id:7,h:'4ft 11'},{id:8,h:'5ft'},{id:9,h:'5ft 1'},{id:10,h:'5ft 2'},
{id:11,h:'5ft 3'},{id:12,h:'5ft 4'},{id:13,h:'5ft 5'},{id:14,h:'5ft 6'},{id:15,h:'5ft 7'},
{id:16,h:'5ft 8'},{id:17,h:'5ft 9'},{id:18,h:'5ft 10'},{id:19,h:'5ft 11'},{id:20,h:'6ft'},
{id:21,h:'6ft 1'},{id:22,h:'6ft 2'},{id:23,h:'6ft 3'},{id:24,h:'6ft 4'},{id:25,h:'6ft 5'},
{id:26,h:'6ft 6'},{id:27,h:'6ft 7'},{id:28,h:'6ft 8'},{id:29,h:'6ft 9'},{id:30,h:'6ft 10'},
{id:31,h:'6ft 11'},{id:32,h:'7ft'}];


  constructor(private imagePicker: ImagePicker,private router: Router,public loadingController: LoadingController,
    public formBuilder: FormBuilder,public alertCtrl: AlertController,
    private country: CountriesService,private authService: AuthService) {

      this.slideTwoForm = this.formBuilder.group({
        firstName: [''],
        gender:[''],
        date:[''],
        // eslint-disable-next-line max-len
        aadhar:[''],
        // eslint-disable-next-line max-len
        email:[''],
        password:['', Validators.compose([Validators.minLength(8), Validators.pattern('[a-zA-Z0-9@$_]*'), Validators.required])],
        // eslint-disable-next-line max-len
        phone:[''],
        country:['',Validators.required],
        state:['',Validators.required],
        city:['']

      });

      this.slideThreeForm = this.formBuilder.group({
        maritalStatue:['',Validators.required],
        mothertongue: ['',Validators.required],
        height:['',Validators.required],
        caste:['',Validators.required],
        subcaste:['',Validators.required],
        aboutme:['']
      });

      this.slideFourForm = this.formBuilder.group({
        edu:['',Validators.required],
        occ:['',Validators.required]
      });
     // this.loadWorker();

   }

  ngOnInit() {
    this.getCountries();

    this.authService.getMotherTongue().subscribe((msg)=>{
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for(let i=0;i<msg[0].length;i++){
          this.mt.push({id:i,name:msg[0][i].mother_tongue});
        }
    });

    this.authService.getCaste().subscribe((msg)=>{
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for(let i=0;i<msg[0].length;i++){
        this.caste.push({id:i,name:msg[0][i].caste_name});
      }
    });

    this.authService.geteducation().subscribe((msg)=>{
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
       for(let i=0;i<msg[0].length;i++){
         this.edu.push({id:i,name:msg[0][i].eduname});
       }
    });

    this.authService.getoccupation().subscribe((msg)=>{
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for(let i=0;i<msg[0].length;i++){
        this.occ.push({id:1,name:msg[0][i].occuname});
      }
    });

    this.slideTwoForm.controls.firstName.disable();
    this.slideTwoForm.controls.gender.disable();
    this.slideTwoForm.controls.date.disable();
    this.slideTwoForm.controls.aadhar.disable();
    this.slideTwoForm.controls.phone.disable();
    this.slideTwoForm.controls.email.disable();
    this.slideThreeForm.controls.subcaste.disable();

    this.authService.getBasicDetails(this.uid).subscribe((msg)=>{
      this.slideTwoForm.get('firstName').setValue(msg[0][0].name);
      if(msg[0][0].gender === 'Male'){
        this.slideTwoForm.get('gender').setValue('male');
      }
      else{
        this.slideTwoForm.get('gender').setValue('female');
      }
      this.slideTwoForm.get('date').setValue(msg[0][0].dob.slice(0,10));
      this.slideTwoForm.get('aadhar').setValue(msg[0][0].uid);
      this.slideTwoForm.get('phone').setValue(msg[0][0].phone_num);
      this.slideTwoForm.get('email').setValue(msg[0][0].mail);
      //this.cont=msg[0][0].country;
      // this.slideTwoForm.get('state').setValue(msg[0][0].state);
      // this.slideTwoForm.get('city').setValue(msg[0][0].city);

    });

     this.authService.getPersonalDetails(this.uid).subscribe((msg)=>{
      this.slideThreeForm.get('maritalStatue').setValue(msg[0][0].marital_status);
      this.slideThreeForm.get('caste').setValue(msg[0][0].caste);
      this.slideThreeForm.get('aboutme').setValue(msg[0][0].aboutme);
      //  if(msg[0][0].marital_status === 'unmarried'){
      //     this.slideThreeForm.get('maritalStatue').setValue('unmarried');
      //  }
     });

    // this.authService.getEduDetails(this.uid).subscribe((msg)=>{});

    // this.authService.getFamilyDetails(this.uid).subscribe((msg)=>{});

    // this.authService.getPartnerDetails(this.uid).subscribe((msg)=>{});

  }

  saveBasicDetails(){
    //console.log(this.slideTwoForm.get('city').value.city);
    this.userbasicdetails={
      uid:this.slideTwoForm.get('aadhar').value,
      country:this.slideTwoForm.get('country').value.CountryName,
      state:this.slideTwoForm.get('state').value.StateName,
      city:this.slideTwoForm.get('city').value.city,
    };
    console.log(this.userbasicdetails);
    this.authService.putBasicDetails(this.userbasicdetails).subscribe((msg)=>{
        console.log(msg);
    });
  }

  savePersonalDetails(){}

  saveEduDetails(){}

  saveFamilyDetails(){}

  savePartnerDetails(){}

  getCountries(){
    this.country.allCountries().
    subscribe(
      data2 => {
        this.countryInfo=data2.Countries;
        console.log('Data:', this.countryInfo);
      },
      err => console.log(err),
      () => console.log('complete')
    );
  }

  onChangeCaste(event: {
    component: IonicSelectableComponent;
    value: any;
  }) {
    this.authService.getSubCaste(event.value.name).subscribe((msg)=>{
      console.log(msg[0]);
      if(msg[0].length > 0){
        this.slideThreeForm.controls.subcaste.enable();
        //eslint-disable-next-line @typescript-eslint/prefer-for-of
        for(let i=0;i<msg[0].length;i++){
          this.subcaste.push({id:i,name:msg[0][i].subcaste_name});
        }
      }
      else{
        this.slideThreeForm.controls.subcaste.disable();
        this.slideThreeForm.controls.subcaste.setValue('');
      }
    });
     //console.log(event.value.name);
  }

  onChangeCountry(event: {
    component: IonicSelectableComponent;
    value: any;
  }) {
     this.stateInfo=event.value.States;
  }

  onChangeState(event: {
    component: IonicSelectableComponent;
    value: any;
  }) {
    //  this.stateInfo=event.value.States;
     this.cityInfo=event.value.Cities;
     // eslint-disable-next-line @typescript-eslint/prefer-for-of
     for (let i = 0; i < this.cityInfo.length; i++){
               this.cities.push({id: i,city: this.cityInfo[i]});
              }
    // this.cities = [Object.assign({}, this.cityInfo)];
    //console.log(this.cities);
  }

  portChange(event: {
    component: IonicSelectableComponent;
    value: any;
  }) {
    console.log('port:', event.value);
  }

  swipeNext(){
    this.slides.slideNext();
  }
  swipeBack(){
    this.slides.slidePrev();
  }

  async slidetwoform(){}
  async slidethreeform(){}
  async slidefourform(){}



}



