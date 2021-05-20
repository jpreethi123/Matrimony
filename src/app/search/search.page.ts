/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CountriesService } from '../countries.service';
import { SigninPage} from '../signin/signin.page';
import { SignupPage } from '../signup/signup.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  @ViewChild('selectComponent') selectComponent: IonicSelectableComponent;
  @ViewChild('selectComponentCaste') selectComponentCaste: IonicSelectableComponent;
  @ViewChild('selectComponentSubcaste') selectComponentSubcaste: IonicSelectableComponent;
  @ViewChild('selectComponentHD') selectComponentHD: IonicSelectableComponent;
  @ViewChild('selectComponentOcc') selectComponentOcc: IonicSelectableComponent;
  @ViewChild('selectComponentSmoke') selectComponentSmoke: IonicSelectableComponent;
  @ViewChild('selectComponentDrink') selectComponentDrink: IonicSelectableComponent;
  @ViewChild('selectComponentDiet') selectComponentDiet: IonicSelectableComponent;
  public searchForm: FormGroup;

  uid='';
  signup=SigninPage.siginUid;
  signin=SignupPage.signUpUid;

  maritalstatue = [{id:'any',name:'any'},{id:'unmarried',name:'unmarried'},{id:'divorced',name:'divorced'},{id:'separated',name:'separated'},{id:'widow',name:'widow'}];
  heightRange=[];
  height_to_num = {};
  caste = [];
  subcaste = [];
  edu = [];
  occ = [];
  public stateInfo: any[] = [];
  public countryInfo: any[] = [];
  public cityInfo: any[] = [];
  cities = [];
  userdetails = {};
  smoke=[{id:'Any',name:'Any'},{id:'Non-Smoker',name:'Non-Smoker'}, {id:'Occasional Smoker',name:'Occasional Smoker'}, {id:'Regular Smoker',name:'Regular Smoker'}];
  drink=[{id:'Any',name:'Any'},{id:'Non-Drinker',name:'Non-Drinker'}, {id:'Light / Social Drinker',name:'Light / Social Drinker'}, {id:'Regular Drinker',name:'Regular Drinker'}];
  // eslint-disable-next-line max-len
  diet=[{id:'Any',name:'Any'},{id:'Veg',name:'Veg'}, {id:'Non-Veg Occasional',name:'Non-Veg Occasional'},{id:'Non-Veg Frequent',name:'Non-Veg Frequent'}, {id:'Eggetarian',name:'Eggetarian'}, {id:'Others (Jain / Vegan)',name:'Others (Jain / Vegan)'}];
  gender = '';
  list = [];
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public static Result = [];
  other = new Set();
  othercaste = new Set();
  othersubcaste = new Set();
  otherhd = new Set();
  otherocc = new Set();
  othersmoke = new Set();
  otherdrink = new Set();
  otherdiet = new Set();

  constructor(private authService: AuthService,public formBuilder: FormBuilder,private country: CountriesService,public router: Router) {

    this.searchForm = this.formBuilder.group({
      maritalStatue:[''],
      agefrom:[''],
      ageto:[''],
      heightfrom:[''],
      heightto:[''],
      caste:[''],
      subCaste:[''],
      country:[''],
      state:[''],
      city:[''],
      edu:[''],
      occ:[''],
      smoke:[''],
      drink:[''],
      diet:['']
    });

   }



  ngOnInit() {
    if(this.signin===''){
      this.uid = this.signup;
    }
    else{
      this.uid = this.signin;
    }

    this.getCountries();

    this.searchForm.controls.subCaste.disable();

    this.authService.getGender(this.uid).subscribe((msg)=>{
      this.gender = msg[0][0].gender;
    });


    this.edu.push({id:'Any',name:'Any'});
    this.authService.geteducation().subscribe((msg)=>{
       for(let i=1;i<msg[0].length+1;i++){
         this.edu.push({id:msg[0][i-1].eduname,name:msg[0][i-1].eduname});
       }
    });

    this.occ.push({id:'Any',name:'Any'});
    this.authService.getoccupation().subscribe((msg)=>{
      for(let i=1;i<msg[0].length+1;i++){
        this.occ.push({id:msg[0][i-1].occuname,name:msg[0][i-1].occuname});
      }
    });

    this.heightRange.push({id:0,name:'Any'});
    this.authService.getheightrange().subscribe((msg)=>{
      for(let i=1;i<msg[0].length+1;i++){
        this.heightRange.push({id:i,name:msg[0][i-1].height});
        this.height_to_num[msg[0][i-1].height] = msg[0][i-1].height_in_num;
      }
    });

    this.caste.push({id:'Any',name:'Any'});
    this.authService.getCaste().subscribe((msg)=>{
      for(let i=1;i<msg[0].length+1;i++){
        this.caste.push({id:msg[0][i-1].caste_name,name:msg[0][i-1].caste_name});
      }
    });

    this.authService.getSearchDetails(this.uid).subscribe((msg)=>{
      console.log(msg);
      if(msg[0][0].age_from != null){
        this.searchForm.get('agefrom').setValue(msg[0][0].age_from);
      }
      if(msg[0][0].age_to != null){
        this.searchForm.get('ageto').setValue(msg[0][0].age_to);
      }
      const hf = Object.keys(this.height_to_num).find(key => this.height_to_num[key] === msg[0][0].height_from);
      if(msg[0][0].height_from != null){
        this.searchForm.get('heightfrom').setValue({name:hf});
      }
      const ht = Object.keys(this.height_to_num).find(key => this.height_to_num[key] === msg[0][0].height_to);
      if(msg[0][0].height_to != null){
        this.searchForm.get('heightto').setValue({name:ht});
      }
      if(msg[0][0].marital_statue != null){
        const a = msg[0][0].marital_statue.split(',');
        const z=[];
        for(let i=0;i<a.length-1;i++){
         z.push({id:a[i],name:a[i]});
        }
        this.searchForm.get('maritalStatue').setValue(z);
      }
      if(msg[0][0].caste != null){
        const a = msg[0][0].caste.split(',');
        const z=[];
        for(let i=0;i<a.length-1;i++){
         z.push({id:a[i],name:a[i]});
        }
        this.searchForm.get('caste').setValue(z);
      }
      if(msg[0][0].subcaste != null){
        const a = msg[0][0].subcaste.split(',');
        const z=[];
        for(let i=0;i<a.length-1;i++){
         z.push({id:a[i],name:a[i]});
        }
        this.searchForm.get('subCaste').setValue(z);
      }
      if(msg[0][0].country != null){
        const a = msg[0][0].country.split(',');
        const z=[];
        for(let i=0;i<a.length-1;i++){
         z.push({id:a[i],name:a[i]});
        }
        this.searchForm.get('country').setValue(z);
      }
      if(msg[0][0].state != null){
        const a = msg[0][0].state.split(',');
        const z=[];
        for(let i=0;i<a.length-1;i++){
         z.push({id:a[i],name:a[i]});
        }
        this.searchForm.get('state').setValue(z);
      }
      if(msg[0][0].city != null){
        const a = msg[0][0].city.split(',');
        const z=[];
        for(let i=0;i<a.length-1;i++){
         z.push({id:a[i],name:a[i]});
        }
        this.searchForm.get('city').setValue(z);
      }
      if(msg[0][0].highest_degree != null){
        const a = msg[0][0].highest_degree.split(',');
        const z=[];
        for(let i=0;i<a.length-1;i++){
         z.push({id:a[i],name:a[i]});
        }
        this.searchForm.get('edu').setValue(z);
      }
      if(msg[0][0].occupation != null){
        const a = msg[0][0].occupation.split(',');
        const z=[];
        for(let i=0;i<a.length-1;i++){
         z.push({id:a[i],name:a[i]});
        }
        this.searchForm.get('occ').setValue(z);
      }
      if(msg[0][0].smoke != null){
        const a = msg[0][0].smoke.split(',');
        const z=[];
        for(let i=0;i<a.length-1;i++){
         z.push({id:a[i],name:a[i]});
        }
        this.searchForm.get('smoke').setValue(z);
      }
      if(msg[0][0].drink != null){
        const a = msg[0][0].drink.split(',');
        const z=[];
        for(let i=0;i<a.length-1;i++){
         z.push({id:a[i],name:a[i]});
        }
        this.searchForm.get('drink').setValue(z);
      }
      if(msg[0][0].diet != null){
        const a = msg[0][0].diet.split(',');
        const z=[];
        for(let i=0;i<a.length-1;i++){
         z.push({id:a[i],name:a[i]});
        }
        this.searchForm.get('diet').setValue(z);
      }
    });

  }


  onChangeCaste(event: {
    component: IonicSelectableComponent;
    value: any;
  }) {
     const a = event.value;
     this.searchForm.get('subCaste').setValue('');
     this.subcaste.push({id:'Any',name:'Any'});
     this.subcaste = [];
      for(let j=0;j<a.length;j++){
        this.authService.getSubCaste(a[j].name).subscribe((msg)=>{
          console.log(msg[0]);
          if(msg[0].length > 0){
            this.searchForm.controls.subCaste.enable();
            //eslint-disable-next-line @typescript-eslint/prefer-for-of
            for(let i=0;i<msg[0].length;i++){
              this.subcaste.push({id:msg[0][i].subcaste_name,name:msg[0][i].subcaste_name});
            }
          }
          if(this.subcaste.length === 0){
            this.searchForm.controls.subCaste.disable();
            this.searchForm.controls.subCaste.setValue('');
          }
        });
     }
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

  onChangeCountry(event: {
    component: IonicSelectableComponent;
    value: any;
  }) {
    this.searchForm.get('state').setValue('');
    this.searchForm.get('city').setValue('');
    const a = (event.value);
    this.stateInfo = [];
    for(let j=0;j<a.length;j++){
      this.stateInfo=a[j].States;
    }
    //this.stateInfo=event.value.States;
  }

  onChangeState(event: {
    component: IonicSelectableComponent;
    value: any;
  }) {
    const a = (event.value);
    this.cities = [];
    this.cityInfo = [];
    for(let j=0;j<a.length;j++){
      this.cityInfo=a[j].Cities;
    }
    for (let i = 0; i < this.cityInfo.length; i++){
               this.cities.push({id: i,city: this.cityInfo[i]});
              }
  }


  formatmaritalstatue(maritalstatue1) {
    return maritalstatue1.map(maritalstatues => maritalstatues.name).join(', ');
  }

  toggleMS(event: {
    component: IonicSelectableComponent;
    item: any;
  }) {
    const a = event.item;
    this.list = [];
    this.list.push(a.name);
    if(this.list[0] === 'any'){
      this.selectComponent.toggleItems(false,this.maritalstatue.slice(1,this.maritalstatue.length));
      this.selectComponent.toggleItems(true,this.maritalstatue.slice(0,1));
      this.other = new Set();
    }
    else{
      this.other.add(a.name);
      console.log(this.other);
      this.selectComponent.toggleItems(false,this.maritalstatue.slice(0,1));
      for(let i=0;i<this.other.size;i++){
        this.selectComponent.toggleItems(true,[{id:Array.from(this.other)[i],name:Array.from(this.other)[i]}]);
      }
    }
  }

  toggleCaste(event: {
    component: IonicSelectableComponent;
    item: any;
  }) {
    const a = event.item;
    this.list = [];
    this.list.push(a.name);
    console.log(this.list);
    if(this.list[0] === 'Any'){
      this.selectComponentCaste.toggleItems(false,this.caste.slice(1,this.caste.length));
      this.selectComponentCaste.toggleItems(true,this.caste.slice(0,1));
      this.othercaste = new Set();
    }
    else{
      this.othercaste.add(a.name);
      //console.log(this.othercaste);
      this.selectComponentCaste.toggleItems(false,this.caste.slice(0,1));
      for(let i=0;i<this.othercaste.size;i++){
        this.selectComponentCaste.toggleItems(true,[{id:Array.from(this.othercaste)[i],name:Array.from(this.othercaste)[i]}]);
      }
    }
  }

  toggleSubcaste(event: {
    component: IonicSelectableComponent;
    item: any;
  }) {
    const a = event.item;
    this.list = [];
    this.list.push(a.name);
    if(this.list[0] === 'Any'){
      this.selectComponentSubcaste.toggleItems(false,this.subcaste.slice(1,this.subcaste.length));
      this.selectComponentSubcaste.toggleItems(true,this.subcaste.slice(0,1));
      this.othersubcaste = new Set();
    }
    else{
      this.othersubcaste.add(a.name);
      //console.log(this.other);
      this.selectComponentSubcaste.toggleItems(false,this.subcaste.slice(0,1));
      for(let i=0;i<this.othersubcaste.size;i++){
        this.selectComponentSubcaste.toggleItems(true,[{id:Array.from(this.othersubcaste)[i],name:Array.from(this.othersubcaste)[i]}]);
      }
    }
  }

  toggleHD(event: {
    component: IonicSelectableComponent;
    item: any;
  }) {
    const a = event.item;
    this.list = [];
    this.list.push(a.name);
    if(this.list[0] === 'Any'){
      this.selectComponentHD.toggleItems(false,this.edu.slice(1,this.edu.length));
      this.selectComponentHD.toggleItems(true,this.edu.slice(0,1));
      this.otherhd = new Set();
    }
    else{
      this.otherhd.add(a.name);
      //console.log(this.other);
      this.selectComponentHD.toggleItems(false,this.edu.slice(0,1));
      for(let i=0;i<this.otherhd.size;i++){
        this.selectComponentHD.toggleItems(true,[{id:Array.from(this.otherhd)[i],name:Array.from(this.otherhd)[i]}]);
      }
    }
  }

  toggleOcc(event: {
    component: IonicSelectableComponent;
    item: any;
  }) {
    const a = event.item;
    this.list = [];
    this.list.push(a.name);
    if(this.list[0] === 'Any'){
      this.selectComponentOcc.toggleItems(false,this.occ.slice(1,this.occ.length));
      this.selectComponentOcc.toggleItems(true,this.occ.slice(0,1));
      this.otherocc = new Set();
    }
    else{
      this.otherocc.add(a.name);
      //console.log(this.other);
      this.selectComponentOcc.toggleItems(false,this.occ.slice(0,1));
      for(let i=0;i<this.otherocc.size;i++){
        this.selectComponentOcc.toggleItems(true,[{id:Array.from(this.otherocc)[i],name:Array.from(this.otherocc)[i]}]);
      }
    }
  }

  toggleDrink(event: {
    component: IonicSelectableComponent;
    item: any;
  }) {
    const a = event.item;
    this.list = [];
    this.list.push(a.name);
    if(this.list[0] === 'Any'){
      this.selectComponentDrink.toggleItems(false,this.drink.slice(1,this.drink.length));
      this.selectComponentDrink.toggleItems(true,this.drink.slice(0,1));
      this.otherdrink = new Set();
    }
    else{
      this.otherdrink.add(a.name);
      //console.log(this.other);
      this.selectComponentDrink.toggleItems(false,this.drink.slice(0,1));
      for(let i=0;i<this.otherdrink.size;i++){
        this.selectComponentDrink.toggleItems(true,[{id:Array.from(this.otherdrink)[i],name:Array.from(this.otherdrink)[i]}]);
      }
    }
  }

  toggleSmoke(event: {
    component: IonicSelectableComponent;
    item: any;
  }) {
    const a = event.item;
    this.list = [];
    this.list.push(a.name);
    if(this.list[0] === 'Any'){
      this.selectComponentSmoke.toggleItems(false,this.smoke.slice(1,this.smoke.length));
      this.selectComponentSmoke.toggleItems(true,this.smoke.slice(0,1));
      this.othersmoke = new Set();
    }
    else{
      this.othersmoke.add(a.name);
      //console.log(this.other);
      this.selectComponentSmoke.toggleItems(false,this.smoke.slice(0,1));
      for(let i=0;i<this.othersmoke.size;i++){
        this.selectComponentSmoke.toggleItems(true,[{id:Array.from(this.othersmoke)[i],name:Array.from(this.othersmoke)[i]}]);
      }
    }
  }

  toggleDiet(event: {
    component: IonicSelectableComponent;
    item: any;
  }) {
    const a = event.item;
    this.list = [];
    this.list.push(a.name);
    if(this.list[0] === 'Any'){
      this.selectComponentDiet.toggleItems(false,this.diet.slice(1,this.diet.length));
      this.selectComponentDiet.toggleItems(true,this.diet.slice(0,1));
      this.otherdiet = new Set();
    }
    else{
      this.otherdiet.add(a.name);
      //console.log(this.other);
      this.selectComponentDiet.toggleItems(false,this.diet.slice(0,1));
      for(let i=0;i<this.otherdiet.size;i++){
        this.selectComponentDiet.toggleItems(true,[{id:Array.from(this.otherdiet)[i],name:Array.from(this.otherdiet)[i]}]);
      }
    }
  }

  clearAll(){
    this.searchForm.reset();
  }

  data(){
    let m = '';
    if(this.searchForm.get('maritalStatue').value === ''){
      m = null;
    }
    else{
      const a = (this.searchForm.get('maritalStatue').value);
      for(let i=0;i<a.length;i++){
        m += this.searchForm.get('maritalStatue').value[i].name + ',';
      }
    }

    let af = '';
    if(this.searchForm.get('agefrom').value === ''){
      af = null;
    }
    else{
      af = this.searchForm.get('agefrom').value;
    }

    let at = '';
    if(this.searchForm.get('ageto').value === ''){
      at = null;
    }
    else{
      at = this.searchForm.get('ageto').value;
    }

    let hf = '';
    if(this.searchForm.get('heightfrom').value.name === undefined){
      hf = null;
    }
    else{
      hf = this.height_to_num[this.searchForm.get('heightfrom').value.name];
    }

    let ht = '';
    if(this.searchForm.get('heightto').value.name === undefined){
      ht = null;
    }
    else{
      ht = this.height_to_num[this.searchForm.get('heightto').value.name];
    }

    let ca = '';
    if(this.searchForm.get('caste').value === ''){
      ca = null;
    }
    else{
      const a = this.searchForm.get('caste').value;
      for(let i=0;i<a.length;i++){
        ca = this.searchForm.get('caste').value[i].name + ',';
      }
    }

    let su = '';
    if(this.searchForm.get('subCaste').value === ''){
      su = null;
    }
    else{
      const a = this.searchForm.get('subCaste').value;
      for(let i=0;i<a.length;i++){
        su += this.searchForm.get('subCaste').value[i].name + ',';
      }
    }

    let co = '';
    if(this.searchForm.get('country').value.CountryName === undefined){
      co = null;
    }
    else{
      co = this.searchForm.get('country').value.CountryName;
    }

    let sa = '';
    if(this.searchForm.get('state').value.StateName === undefined){
      sa = null;
    }
    else{
      sa = this.searchForm.get('state').value.StateName;
    }

    let ci = '';
    if(this.searchForm.get('city').value === ''){
      ci = null;
    }
    else{
      const a = this.searchForm.get('city').value;
      for(let i=0;i<a.length;i++){
        ci += this.searchForm.get('city').value[i].city + ',';
      }
    }

    let hd = '';
    if(this.searchForm.get('edu').value === ''){
      hd = null;
    }
    else{
      const a = this.searchForm.get('edu').value;
      for(let i=0;i<a.length;i++){
        hd += this.searchForm.get('edu').value[i].name + ',';
      }
    }

    let o = '';
    if(this.searchForm.get('occ').value === ''){
      o = null;
    }
    else{
      const a = this.searchForm.get('occ').value;
      for(let i=0;i<a.length;i++){
        o += this.searchForm.get('occ').value[i].name + ',';
      }
    }

    let sm = '';
    if(this.searchForm.get('smoke').value === ''){
      sm = null;
    }
    else{
      const a = this.searchForm.get('smoke').value;
      for(let i=0;i<a.length;i++){
        sm += this.searchForm.get('smoke').value[i].name + ',';
      }
    }

    let dr = '';
    if(this.searchForm.get('drink').value === ''){
      dr = null;
    }
    else{
      const a =this.searchForm.get('drink').value;
      for(let i=0;i<a.length;i++){
        dr += this.searchForm.get('drink').value[i].name + ',';
      }
    }

    let di = '';
    if(this.searchForm.get('diet').value === ''){
      di = null;
    }
    else{
      const a = this.searchForm.get('diet').value;
      for(let i=0;i<a.length;i++){
        di += this.searchForm.get('diet').value[i].name + ',';
      }
    }
    let g = '';
    if(this.gender === 'Female'){ g = 'Male';}
      else{ g = 'Female';}

    this.userdetails={
      uid:this.uid,
      marital_statue:m,
      age_from:af,
      age_to:at,
      height_from:hf,
      height_to:ht,
      caste:ca,
      subcaste:su,
      country:co,
      state:sa,
      city:ci,
      highest_degree:hd,
      occupation:o,
      smoke:sm,
      drink:dr,
      diet:di,
      gender: g,
    };
  }

  saveSearch(){
    //console.log('key ',Object.keys(this.height_to_num).find(key => this.height_to_num[key] === '5.30'));
    //console.log('gender ',this.gender);
    this.data();
    //console.log(this.userdetails);
    this.authService.putSearchDetails(this.userdetails).subscribe((msg)=>{
      console.log(msg);
    });
  }

  search(){
    this.data();
    console.log(this.userdetails);
    this.authService.getSearch(this.userdetails).subscribe((msg)=>{
      //console.log(msg[0]);
      const a = msg[0];
      for(let i=0;i<a.length;i++){
        SearchPage.Result.push(a[i].uid);
      }

    });
    //console.log(SearchPage.Result);
    this.router.navigate(['searchresult']);
  }

}


//https://github.com/ionic-team/ionic-docs/blob/master/src/demos/api/searchbar/index.html
