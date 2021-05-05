import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { IonicSelectableComponent } from 'ionic-selectable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { CountriesService } from './../countries.service';
import { Platform } from '@ionic/angular';
import { Plugins,CameraResultType,CameraSource } from '@capacitor/core';
import { createWorker } from 'tesseract.js';
import { AuthService } from './../services/auth.service';

// eslint-disable-next-line @typescript-eslint/naming-convention
const { Camera }=Plugins;


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  @ViewChild('mySlider')  slides: IonSlides;
  imageResponse: any;
  options: any;
  public slideTwoForm: FormGroup;
  public slideThreeForm: FormGroup;
  public slideFourForm: FormGroup;

  public stateInfo: any[] = [];
  public countryInfo: any[] = [];
  public cityInfo: any[] = [];
  cities = [];

  mt = [];
  caste = [];
  subcaste = [];

  edu=[];
  occ=[];

	public submitAttempt = false;
  username; useruid;usergender: string;userdate;
  date='';date1='';name=[];txt=''; image=''; ocr='';ocr1='';
  i=0;str=[];j=0;k=0;p=0;gen='';
  opresult='';ocrResult='';
  hasname=true;uploaded=false;
  isgender=true;
  mm;yyyy;dd;
  userdetails;
  isuser=false;

  worker: Tesseract.Worker;
  workerReady=false;


  // // eslint-disable-next-line @typescript-eslint/naming-convention
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


selectsal=null;
salary=[{id:1,name:'less than 50000'},{id:2,name:'50000-1 lakh'},{id:3,name:'1 lakh-1.5 lakh'},{id:4,name:'1.5 lakh-2 lakh'},
{id:5,name:'2 lakh-2.5 lakh'},{id:6,name:'2.5 lakh-3 lakh'},{id:7,name:'3 lakh- 4 lakh'},{id:8,name:'4 lakh-5 lakh'},
{id:9,name:'5 lakh-6 lakh'},{id:10,name:'6 lakh-7 lakh'},{id:11,name:'7 lakh-8 lakh'},{id:12,name:'8 lakh-9 lakh'},
{id:13,name:'9 lakh-10 lakh'},{id:14,name:'10 lakh-12 lakh'},{id:15,name:'12 lakh-15 lakh'},{id:16,name:'15 lakh-20 lakh'},
{id:17,name:'20 lakh-25 lakh'},{id:18,name:'25 lakh-30 lakh'},{id:19,name:'30 lakh-50 lakh'},{id:20,name:'bove 50 lakh'}];

selectsalpre=null;
salary1=[{id:1,name:'less than 50000'},{id:2,name:'50000-1 lakh'},{id:3,name:'1 lakh-1.5 lakh'},{id:4,name:'1.5 lakh-2 lakh'},
{id:5,name:'2 lakh-2.5 lakh'},{id:6,name:'2.5 lakh-3 lakh'},{id:7,name:'3 lakh- 4 lakh'},{id:8,name:'4 lakh-5 lakh'},
{id:9,name:'5 lakh-6 lakh'},{id:10,name:'6 lakh-7 lakh'},{id:11,name:'7 lakh-8 lakh'},{id:12,name:'8 lakh-9 lakh'},
{id:13,name:'9 lakh-10 lakh'},{id:14,name:'10 lakh-12 lakh'},{id:15,name:'12 lakh-15 lakh'},{id:16,name:'15 lakh-20 lakh'},
{id:17,name:'20 lakh-25 lakh'},{id:18,name:'25 lakh-30 lakh'},{id:19,name:'30 lakh-50 lakh'},{id:20,name:'bove 50 lakh'}];



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
    public formBuilder: FormBuilder,public alertCtrl: AlertController,private country: CountriesService,private authService: AuthService) {
      this.slideTwoForm = this.formBuilder.group({
        firstName: ['', Validators.compose([Validators.minLength(3), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        // eslint-disable-next-line max-len
        gender:['',Validators.required],
        date:['',Validators.required],
        aadhar:['',Validators.compose([Validators.maxLength(14), Validators.pattern('[0-9 ]*'),
        Validators.required,Validators.minLength(14)])],
        // eslint-disable-next-line max-len
        email:['', Validators.compose([Validators.minLength(10), Validators.pattern('^[a-z0-9_.+-]+@[a-z0-9-]+.[a-z]+$'), Validators.required])],
        password:['', Validators.compose([Validators.minLength(8), Validators.pattern('[a-zA-Z0-9@$_]*'), Validators.required])],
        // eslint-disable-next-line max-len
        phone:['', Validators.compose([Validators.minLength(10), Validators.pattern('[0-9]*'), Validators.required,Validators.maxLength(10)])],
        country:['',Validators.required],
        state:['',Validators.required],
        city:['',Validators.required]
      });

      this.slideThreeForm = this.formBuilder.group({
        maritalStatue:['',Validators.required],
        mothertongue: ['',Validators.required],
        height:['',Validators.required],
        caste:['',Validators.required],
        subcaste:['']
      });

      this.slideFourForm = this.formBuilder.group({
        edu:['',Validators.required],
        occ:['',Validators.required]
      });
      this.loadWorker();
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

    this.slideThreeForm.controls.subcaste.disable();

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

  getImages() {
    this.options = {
      // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
      // selection of a single image, the plugin will return it.
      //maximumImagesCount: 3,

      // max width and height to allow the images to be.  Will keep aspect
      // ratio no matter what.  So if both are 800, the returned image
      // will be at most 800 pixels wide and 800 pixels tall.  If the width is
      // 800 and height 0 the image will be 800 pixels wide if the source
      // is at least that wide.
      width: 200,
      //height: 200,

      // quality of resized image, defaults to 100
      quality: 25,

      // output type, defaults to FILE_URIs.
      // available options are
      // window.imagePicker.OutputType.FILE_URI (0) or
      // window.imagePicker.OutputType.BASE64_STRING (1)
      outputType: 1
    };
    this.imageResponse = [];
    this.imagePicker.getPictures(this.options).then((results) => {
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for(let i = 0; i < results.length; i++) {
        this.imageResponse.push('data:image/jpeg;base64,' + results[i]);
      }
    }, (err) => {
      alert(err);
    });
  }


  async swipeNext(){
    if(this.image === '')
    {
      const alert=await this.alertCtrl.create({
        message: 'please upload or capture your Aadhar',
        buttons:['Ok']
      });
      await alert.present();


    }
    else{
    this.slides.slideNext();
    }
  }
  swipeBack(){
    this.slides.slidePrev();
  }

  async slidetwoform(){
    this.useruid=this.slideTwoForm.get('aadhar').value;
    this.username=this.slideTwoForm.get('firstName').value;
    this.usergender=this.slideTwoForm.get('gender').value;
    this.userdate=this.slideTwoForm.get('date').value;

    const result=await this.worker.recognize(this.image);

    this.ocrResult=result.data.text;
    this.ocr=result.data.text;
    while(this.i<this.ocr.length)
    {
      if(this.ocr.charAt(this.i)==='\n')
      {
        if(this.ocr1!=='' && this.ocr1!=='\n')
        {
        this.str[this.j]=this.ocr1;
        this.j=this.j+1;
        }
        this.ocr1='';
      }
      else
      {
        this.ocr1=this.ocr1+this.ocr.charAt(this.i);
      }
      this.i=this.i+1;

    }
    while(this.k<this.str.length)
    {
      console.log('line ',this.k,' ',this.str[this.k]);
      this.opresult=this.opresult+this.str[this.k]+'\n';
      this.k=this.k+1;

    }

    this.gen=this.usergender.toUpperCase();
    this.name=this.username.split(' ');

    if(this.usergender==='Male')
    {
      if((this.opresult.includes('Female')||this.opresult.includes('FEMALE')))
      {
        this.isgender=false;
      }
    }

    console.log('gender '+this.isgender);
    for(this.p=0;this.p<this.name.length;this.p=this.p+1)
    {
      this.txt=this.name[this.p].charAt(0).toUpperCase() +this.name[this.p].substr(1).toLowerCase();
      if((!this.opresult.includes(this.txt))&& (this.name[this.p]!==' '))
      {

        this.hasname=false;
        console.log(this.name[this.p]);
        break;
      }

    }

    this.date=this.userdate.substring(8,10)+'/'+this.userdate.substring(5,7)+'/'+this.userdate.substring(0,4);
    this.date1=this.userdate.substring(0,4);
    console.log('my details : '+this.useruid+' '+this.username+' '+ this.usergender+' '+this.userdate+' '+this.date);
    if(!this.slideTwoForm.valid)
    {
      const alert = await this.alertCtrl.create({
        message: 'Please enter all details',
        buttons: ['OK']
      });
      await alert.present();

    }

   else if(this.hasname && (this.opresult.includes(this.useruid) && this.useruid.length===14) &&
     ( this.isgender && (((this.opresult).includes(this.usergender)) || ((this.opresult).includes(this.gen))) )&&
     ((this.opresult.includes('Birth') && this.opresult.includes(this.date1) ) ||
      (this.opresult.includes('DOB') && this.opresult.includes(this.date))))
    {

      this.slides.slideNext();
    }
    else{
      const alert = await this.alertCtrl.create({
        message: 'enter details as per Aadhar',
        buttons: ['OK']
      });
      await alert.present();
    }


  }

  async slidethreeform(){
    if(this.slideThreeForm.valid){
      this.slides.slideNext();
    }
    else{
      const alert = await this.alertCtrl.create({
        message: 'Please enter all details',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  portChange(event: {
    component: IonicSelectableComponent;
    value: any;
  }) {
    console.log('port:', event.value);
  }


  async signup(){
    if(this.slideFourForm.valid){

       this.usersignup();
     }
    else{
      const alert = await this.alertCtrl.create({
        message: 'Please enter all details',
        buttons: ['OK']
      });
      await alert.present();
    }
  }



  async loadWorker(){
    this.worker = createWorker({
      logger: progress =>{
        console.log(progress);

      }
    });

    await this.worker.load();
    await this.worker.loadLanguage('eng');

    await this.worker.initialize('eng');

     this.workerReady=true;
  }



  async captureImage() {

    const image=await Camera.getPhoto({
      quality:90,
      allowEditing:true,
      resultType:CameraResultType.DataUrl,
      source:CameraSource.Camera

    });
    this.uploaded=true;
    console.log('image ',image);
    this.image=image.dataUrl;


  }

  async usersignup(): Promise<void>{
    const country1=this.slideTwoForm.get('country').value;
    //console.log('country name',country1.CountryName);
    const state1=this.slideTwoForm.get('state').value;
    const city1=this.slideTwoForm.get('city').value;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const mother_tongue1=this.slideThreeForm.get('mothertongue').value;
    const height1=this.slideThreeForm.get('height').value;
    const degree=this.slideFourForm.get('edu').value;
    const occ1=this.slideFourForm.get('occ').value;
    this.userdetails={
      uid:this.slideTwoForm.get('aadhar').value,
      name:this.slideTwoForm.get('firstName').value,
      gender:this.slideTwoForm.get('gender').value,
      dob:this.slideTwoForm.get('date').value,
      mail:this.slideTwoForm.get('email').value,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      phone_num:this.slideTwoForm.get('phone').value,
      password:this.slideTwoForm.get('password').value,
      country:country1.CountryName,
      state:state1.StateName,
      city:city1.city,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      marital_status:this.slideThreeForm.get('maritalStatue').value,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      mother_tongue:mother_tongue1.name,
      caste:this.slideThreeForm.get('caste').value,
      height:height1.h,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      highest_degree:degree.name,
      occupation:occ1.name

    };
    this.authService.signup(this.userdetails)
    .subscribe(async (msg)=>{
      if(msg)
      {
        this.isuser=true;
        const loading=await this.loadingController.create({
          duration:500,
          message:'Please wait...',
          translucent:true,
          cssClass:'custom-class custom-loading'
        });
        console.log('console msg',msg);
        this.router.navigate(['main']);
        return (await loading).present();
      }

    });
    if(this.isuser===false)
      {
        const alert = await this.alertCtrl.create({
          message: 'User with this Mail ID/UID already exists',
          buttons: ['OK']
        });
        await alert.present();
      }
    console.log('console msg',this.isuser);
    console.log('entire details are: ',this.userdetails);

  }

}
