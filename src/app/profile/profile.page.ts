/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { AlertController, IonSlides, LoadingController, ToastController  } from '@ionic/angular';
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
  public slideSevenForm: FormGroup;
  public slideEightForm: FormGroup;

  public stateInfo: any[] = [];
  public countryInfo: any[] = [];
  public cityInfo: any[] = [];
  cities = [];

  public submitAttempt = false;
  userdetails = {};

  mt = [];
  caste = [];
  subcaste = [];
  edu = [];
  occ = [];
  heightRange=[];
  salary=[];

  // eslint-disable-next-line @typescript-eslint/naming-convention
  marital_statue ='';
  maritalstatue = ['unmarried','divorced','separated','widow'];
  personType = ['self','Father','Mother','Brother','Sister','Relative','Friend'];
  personType2=[];
  personType3=[];
  smoke=['Non-Smoker', 'Occasional Smoker', 'Regular Smoker'];
  drink=['Non-Drinker', 'Light / Social Drinker', 'Regular Drinker'];
  diet=['Veg', 'Non-Veg Occasional',' Non-Veg Frequent', 'Eggetarian', 'Others (Jain / Vegan)'];

// selectsal=null;
// salary=[{id:1,name:'less than 50000'},{id:2,name:'50000-1 lakh'},{id:3,name:'1 lakh-1.5 lakh'},{id:4,name:'1.5 lakh-2 lakh'},
// {id:5,name:'2 lakh-2.5 lakh'},{id:6,name:'2.5 lakh-3 lakh'},{id:7,name:'3 lakh- 4 lakh'},{id:8,name:'4 lakh-5 lakh'},
// {id:9,name:'5 lakh-6 lakh'},{id:10,name:'6 lakh-7 lakh'},{id:11,name:'7 lakh-8 lakh'},{id:12,name:'8 lakh-9 lakh'},
// {id:13,name:'9 lakh-10 lakh'},{id:14,name:'10 lakh-12 lakh'},{id:15,name:'12 lakh-15 lakh'},{id:16,name:'15 lakh-20 lakh'},
// {id:17,name:'20 lakh-25 lakh'},{id:18,name:'25 lakh-30 lakh'},{id:19,name:'30 lakh-50 lakh'},{id:20,name:'above 50 lakh'}];

// selectsalpre=null;
// salary1=[{id:1,name:'less than 50000'},{id:2,name:'50000-1 lakh'},{id:3,name:'1 lakh-1.5 lakh'},{id:4,name:'1.5 lakh-2 lakh'},
// {id:5,name:'2 lakh-2.5 lakh'},{id:6,name:'2.5 lakh-3 lakh'},{id:7,name:'3 lakh- 4 lakh'},{id:8,name:'4 lakh-5 lakh'},
// {id:9,name:'5 lakh-6 lakh'},{id:10,name:'6 lakh-7 lakh'},{id:11,name:'7 lakh-8 lakh'},{id:12,name:'8 lakh-9 lakh'},
// {id:13,name:'9 lakh-10 lakh'},{id:14,name:'10 lakh-12 lakh'},{id:15,name:'12 lakh-15 lakh'},{id:16,name:'15 lakh-20 lakh'},
// {id:17,name:'20 lakh-25 lakh'},{id:18,name:'25 lakh-30 lakh'},{id:19,name:'30 lakh-50 lakh'},{id:20,name:'bove 50 lakh'}];


// heightsel=null;

// heightRange=[{id:1,h:'4ft 5'},{id:2,h:'4ft 6'},{id:3,h:'4ft 7'},{id:4,h:'4ft 8'},{id:5,h:'4ft 9'},
// {id:6,h:'4ft 10'},{id:7,h:'4ft 11'},{id:8,h:'5ft'},{id:9,h:'5ft 1'},{id:10,h:'5ft 2'},
// {id:11,h:'5ft 3'},{id:12,h:'5ft 4'},{id:13,h:'5ft 5'},{id:14,h:'5ft 6'},{id:15,h:'5ft 7'},
// {id:16,h:'5ft 8'},{id:17,h:'5ft 9'},{id:18,h:'5ft 10'},{id:19,h:'5ft 11'},{id:20,h:'6ft'},
// {id:21,h:'6ft 1'},{id:22,h:'6ft 2'},{id:23,h:'6ft 3'},{id:24,h:'6ft 4'},{id:25,h:'6ft 5'},
// {id:26,h:'6ft 6'},{id:27,h:'6ft 7'},{id:28,h:'6ft 8'},{id:29,h:'6ft 9'},{id:30,h:'6ft 10'},
// {id:31,h:'6ft 11'},{id:32,h:'7ft'}];


// heightselpre=null;

// heightRange1=[{id:1,h:'4ft 5'},{id:2,h:'4ft 6'},{id:3,h:'4ft 7'},{id:4,h:'4ft 8'},{id:5,h:'4ft 9'},
// {id:6,h:'4ft 10'},{id:7,h:'4ft 11'},{id:8,h:'5ft'},{id:9,h:'5ft 1'},{id:10,h:'5ft 2'},
// {id:11,h:'5ft 3'},{id:12,h:'5ft 4'},{id:13,h:'5ft 5'},{id:14,h:'5ft 6'},{id:15,h:'5ft 7'},
// {id:16,h:'5ft 8'},{id:17,h:'5ft 9'},{id:18,h:'5ft 10'},{id:19,h:'5ft 11'},{id:20,h:'6ft'},
// {id:21,h:'6ft 1'},{id:22,h:'6ft 2'},{id:23,h:'6ft 3'},{id:24,h:'6ft 4'},{id:25,h:'6ft 5'},
// {id:26,h:'6ft 6'},{id:27,h:'6ft 7'},{id:28,h:'6ft 8'},{id:29,h:'6ft 9'},{id:30,h:'6ft 10'},
// {id:31,h:'6ft 11'},{id:32,h:'7ft'}];


  constructor(private imagePicker: ImagePicker,private router: Router,public loadingController: LoadingController,
    public formBuilder: FormBuilder,public alertCtrl: AlertController,public toastController: ToastController,
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
        weight:[''],
        height:['',Validators.required],
        caste:['',Validators.required],
        subcaste:[''],
        aboutme:['']
      });

      this.slideFourForm = this.formBuilder.group({
        edu:['',Validators.required],
        occ:['',Validators.required],
        salary:['']
      });

      this.slideSixForm = this.formBuilder.group({
        fathername:[''],
        fatherocc:[''],
        mothername:[''],
        motherocc:[''],
        siblings:[''],
        familytype:[''],
        familystatus:[''],
        familyvalue:['']
      });

      this.slideFiveForm = this.formBuilder.group({
        persontype1:[''],
        persontype2:[''],
        persontype3:[''],
        p1pt1:[''],
        p2pt1:[''],
        p1pt2:[''],
        p2pt2:[''],
        p3pt1:[''],
        p3pt2:[''],
      });

      this.slideSevenForm = this.formBuilder.group({
        smoke:[''],
        diet:[''],
        drink:['']
      });

      this.slideEightForm = this.formBuilder.group({
        agefrom: [''],
        ageto:[''],
        height:[''],
        mt:[''],
        caste:[''],
        subcaste:[''],
        edu:[''],
        occ:[''],
        salary:['']
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
        this.occ.push({id:i,name:msg[0][i].occuname});
      }
    });

    this.authService.getsalaryscale().subscribe((msg)=>{
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for(let i=0;i<msg[0].length;i++){
        this.salary.push({id:i,name:msg[0][i].salary});
      }
    });

    this.authService.getheightrange().subscribe((msg)=>{
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for(let i=0;i<msg[0].length;i++){
        this.heightRange.push({id:i,name:msg[0][i].height});
      }
    });

    this.slideTwoForm.controls.firstName.disable();
    this.slideTwoForm.controls.gender.disable();
    this.slideTwoForm.controls.date.disable();
    this.slideTwoForm.controls.aadhar.disable();
    this.slideTwoForm.controls.phone.disable();
    this.slideTwoForm.controls.email.disable();
    this.slideThreeForm.controls.subcaste.disable();

    //Get Basic Details
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
      // eslint-disable-next-line @typescript-eslint/naming-convention
      this.slideTwoForm.get('country').setValue({id:msg[0][0].country,CountryName:msg[0][0].country});
      // eslint-disable-next-line @typescript-eslint/naming-convention
      this.slideTwoForm.get('state').setValue({id:msg[0][0].state,StateName:msg[0][0].state});
      this.slideTwoForm.get('city').setValue({id:msg[0][0].city,city:msg[0][0].city});
    });

    //Get Personal Details
     this.authService.getPersonalDetails(this.uid).subscribe((msg)=>{
      this.slideThreeForm.get('maritalStatue').setValue(msg[0][0].marital_status);
      this.slideThreeForm.get('mothertongue').setValue({name:msg[0][0].mother_tongue});
      this.slideThreeForm.get('caste').setValue({name:msg[0][0].caste});
      this.slideThreeForm.get('subcaste').setValue({name:msg[0][0].subcaste});
      this.slideThreeForm.get('aboutme').setValue(msg[0][0].aboutme);
      this.slideThreeForm.get('height').setValue({name:msg[0][0].height});
      this.slideThreeForm.get('weight').setValue(msg[0][0].weight);
     });

    //Get Educational Details
    this.authService.getEduDetails(this.uid).subscribe((msg)=>{
      this.slideFourForm.get('edu').setValue({name:msg[0][0].highest_degree});
      this.slideFourForm.get('occ').setValue({name:msg[0][0].occupation});
      this.slideFourForm.get('salary').setValue({name:msg[0][0].salary});
    });

    //Get Family Details
    this.authService.getFamilyDetails(this.uid).subscribe((msg)=>{
      this.slideSixForm.get('fathername').setValue(msg[0][0].father_name);
      this.slideSixForm.get('fatherocc').setValue({name:msg[0][0].father_occupation});
      this.slideSixForm.get('mothername').setValue(msg[0][0].mother_name);
      this.slideSixForm.get('motherocc').setValue({name:msg[0][0].mother_occupation});
      this.slideSixForm.get('siblings').setValue(msg[0][0].sibling);
      this.slideSixForm.get('familytype').setValue(msg[0][0].family_type);
      this.slideSixForm.get('familystatus').setValue(msg[0][0].family_status);
      this.slideSixForm.get('familyvalue').setValue(msg[0][0].family_value);
    });

    //Get Partner Details
    this.authService.getPartnerDetails(this.uid).subscribe((msg)=>{
      this.slideEightForm.get('agefrom').setValue(msg[0][0].age_from);
      this.slideEightForm.get('ageto').setValue(msg[0][0].age_to);
      this.slideEightForm.get('height').setValue({name:msg[0][0].height});
      this.slideEightForm.get('mt').setValue({name:msg[0][0].mother_tongue});
      this.slideEightForm.get('edu').setValue({name:msg[0][0].highest_degree});
      this.slideEightForm.get('occ').setValue({name:msg[0][0].occupation});
      this.slideEightForm.get('salary').setValue({name:msg[0][0].salary});
      this.slideEightForm.get('caste').setValue({name:msg[0][0].caste});
      this.slideEightForm.get('subcaste').setValue({name:msg[0][0].subcaste});
    });

    //Get Contact Details
    this.authService.getContactDetails(this.uid).subscribe((msg)=>{
      this.slideFiveForm.get('persontype1').setValue(msg[0][0].person_type1);
      this.slideFiveForm.get('persontype2').setValue(msg[0][0].person_type2);
      this.slideFiveForm.get('persontype3').setValue(msg[0][0].person_type3);
      this.slideFiveForm.get('p1pt1').setValue(msg[0][0].person_type1_num1);
      this.slideFiveForm.get('p1pt2').setValue(msg[0][0].person_type1_num2);
      this.slideFiveForm.get('p2pt1').setValue(msg[0][0].person_type2_num1);
      this.slideFiveForm.get('p2pt2').setValue(msg[0][0].person_type2_num2);
      this.slideFiveForm.get('p3pt1').setValue(msg[0][0].person_type3_num1);
      this.slideFiveForm.get('p3pt2').setValue(msg[0][0].person_type3_num2);

    });

    //Get Other Details
    this.authService.getOtherDetails(this.uid).subscribe((msg)=>{
      this.slideSevenForm.get('smoke').setValue(msg[0][0].smoke);
      this.slideSevenForm.get('drink').setValue(msg[0][0].drink);
      this.slideSevenForm.get('diet').setValue(msg[0][0].diet);
    });

  }
  msChange(a: any){
    this.marital_statue = a.target.value;
    console.log(this.marital_statue);
  }

  onPersontype1Change(event){
    const a = this.personType.indexOf(event.target.value);
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for(let i=0;i<this.personType.length;i++){
        if(i!==a){
          this.personType2.push(this.personType[i]);
        }
    }
  }

  onPersontype2Change(event){
    const a = this.personType2.indexOf(event.target.value);
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for(let i=0;i<this.personType2.length;i++){
        if(i!==a){
          this.personType3.push(this.personType2[i]);
        }
    }
  }

  saveBasicDetails(){
    this.userdetails={
      uid:this.slideTwoForm.get('aadhar').value,
      country:this.slideTwoForm.get('country').value.CountryName,
      state:this.slideTwoForm.get('state').value.StateName,
      city:this.slideTwoForm.get('city').value.city,
    };
    this.authService.putBasicDetails(this.userdetails).subscribe((msg)=>{
        console.log(msg);
    });
  }

  savePersonalDetails(){
    let sc='';
    if(this.slideThreeForm.get('subcaste').value.name === undefined){
       sc = null;
    }
    else{
      sc = this.slideThreeForm.get('subcaste').value.name;
    }
    let c='';
    if(this.slideThreeForm.get('caste').value.name === undefined){
       c = null;
    }
    else{
      c = this.slideThreeForm.get('caste').value.name;
    }
    let h='';
    if(this.slideThreeForm.get('height').value.name === undefined){
       h = null;
    }
    else{
      h = this.slideThreeForm.get('height').value.name;
    }
    let m='';
    if(this.slideThreeForm.get('mothertongue').value.name === undefined){
       m = null;
    }
    else{
      m = this.slideThreeForm.get('mothertongue').value.name;
    }
    this.userdetails={
      uid:this.slideTwoForm.get('aadhar').value,
      martialstatu:this.slideThreeForm.get('maritalStatue').value,
      mothertongue:m,
      caste:c,
      subcaste:sc,
      weight:this.slideThreeForm.get('weight').value,
      height:h,
      aboutme:this.slideThreeForm.get('aboutme').value,
    };
    //console.log(this.userdetails);
    // const toast = await this.toastController.create({
    //   color: 'success',
    //   message: 'Your settings have been saved.',
    //   duration: 2000
    // });
    // toast.present();
    this.authService.putPersonalDetails(this.userdetails).subscribe((msg)=>{
        console.log(msg);
    });
  }

  saveEduDetails(){
    let sc='';
    if(this.slideFourForm.get('salary').value.name === undefined){
       sc = null;
    }
    else{
      sc = this.slideFourForm.get('salary').value.name;
    }
    this.userdetails={
      uid:this.slideTwoForm.get('aadhar').value,
      edu:this.slideFourForm.get('edu').value.name,
      occu:this.slideFourForm.get('occ').value.name,
      salary:sc,
    };
    //console.log(this.userdetails);
    this.authService.putEduDetails(this.userdetails).subscribe((msg)=>{
      console.log(msg);
    });
  }

  saveFamilyDetails(){
    let f = '';
    if(this.slideSixForm.get('fatherocc').value.name === undefined){
      f = null;
    }
    else{
      f = this.slideSixForm.get('fatherocc').value.name;
    }
    let m = '';
    if(this.slideSixForm.get('motherocc').value.name === undefined){
      m = null;
    }
    else{
      m = this.slideSixForm.get('motherocc').value.name;
    }
    this.userdetails={
      uid:this.slideTwoForm.get('aadhar').value,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      father_name:this.slideSixForm.get('fathername').value,
      father_occupation:f,
      mother_name:this.slideSixForm.get('mothername').value,
      mother_occupation:m,
      sibling:this.slideSixForm.get('siblings').value,
      family_type:this.slideSixForm.get('familytype').value,
      family_status:this.slideSixForm.get('familystatus').value,
      family_value:this.slideSixForm.get('familyvalue').value
    };
    //console.log(this.userdetails);
    this.authService.putFamilyDetails(this.userdetails).subscribe((msg)=>{
      console.log(msg);
    });
  }

  savePartnerDetails(){
    let h='';
    if(this.slideEightForm.get('height').value.name === undefined){
       h = null;
    }
    else{
      h = this.slideEightForm.get('height').value.name;
    }
    let m='';
    if(this.slideEightForm.get('mt').value.name === undefined){
       m = null;
    }
    else{
      m = this.slideEightForm.get('mt').value.name;
    }
    let e = '';
    if(this.slideEightForm.get('edu').value.name === undefined){
      e = null;
    }
    else{
      e = this.slideEightForm.get('edu').value.name;
    }
    let o = '';
    if(this.slideEightForm.get('occ').value.name === undefined){
      o = null;
    }
    else{
      o = this.slideEightForm.get('occ').value.name;
    }
    let s = '';
    if(this.slideEightForm.get('salary').value.name === undefined){
      s = null;
    }
    else{
      s = this.slideEightForm.get('salary').value.name;
    }
    let c = '';
    if(this.slideEightForm.get('caste').value.name === undefined){
      c = null;
    }
    else{
      c = this.slideEightForm.get('caste').value.name;
    }
    let sc = '';
    if(this.slideEightForm.get('subcaste').value.name === undefined){
      sc = null;
    }
    else{
      sc = this.slideEightForm.get('subcaste').value.name;
    }
    this.userdetails={
      uid:this.slideTwoForm.get('aadhar').value,
      age_from:this.slideEightForm.get('agefrom').value,
      age_to:this.slideEightForm.get('ageto').value,
      height:h,
      mother_tongue:m,
      highest_degree:e,
      occupation:o,
      salary:s,
      caste:c,
      subcaste:sc
    };
    //console.log(this.userdetails);
    this.authService.putPartnerDetails(this.userdetails).subscribe((msg)=>{
      console.log(msg);
    });
  }

  saveContactDetails(){
    this.userdetails={
      uid:this.slideTwoForm.get('aadhar').value,
      person_type1:this.slideFiveForm.get('persontype1').value,
      person_type2:this.slideFiveForm.get('persontype2').value,
      person_type3:this.slideFiveForm.get('persontype3').value,
      person_type1_num1:this.slideFiveForm.get('p1pt1').value,
      person_type1_num2:this.slideFiveForm.get('p1pt2').value,
      person_type2_num1:this.slideFiveForm.get('p2pt1').value,
      person_type2_num2:this.slideFiveForm.get('p2pt2').value,
      person_type3_num1:this.slideFiveForm.get('p3pt1').value,
      person_type3_num2:this.slideFiveForm.get('p3pt2').value,
    };
    //console.log(this.userdetails);
    this.authService.putContactDetails(this.userdetails).subscribe((msg)=>{
      console.log(msg);
    });
  }

  saveOtherDetails(){
    this.userdetails={
      uid:this.slideTwoForm.get('aadhar').value,
      smoke:this.slideSevenForm.get('smoke').value,
      drink:this.slideSevenForm.get('drink').value,
      diet:this.slideSevenForm.get('diet').value
    };
    this.authService.putOtherDetails(this.userdetails).subscribe((msg)=>{
      console.log(msg);
    });
  }

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



