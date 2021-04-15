import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { IonicSelectableComponent } from 'ionic-selectable';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  @ViewChild('mySlider')  slides: IonSlides;
  imageResponse: any;
  options: any;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  selected_mt = null;
  motherTongue=[{id:1,name:'Assamese'},{id:2,name:'Bangla'},{id:3,name:'Bodo'},
  {id:4,name:'Dogri'},{id:5,name:'Gujarati'},{id:6,name:'Hindi'},
  {id:7,name:'Kashmiri'},{id:8,name:'Kannada'},{id:9,name:'Konkani'},
  {id:10,name:'Maithili'},{id:11,name:'Malayalam'},{id:12,name:'Manipuri'},
  {id:13,name:'Marathi'},{id:14,name:'Nepali'},{id:15,name:'Oriya'},
  {id:16,name:'Punjabi'},{id:17,name:'Tamil'},{id:18,name:'Telugu'},
  {id:19,name:'Santali'},{id:20,name:'Sindhi'},{id:21,name:'Urdu'}
  ];


  heightRange=['4ft 10','4ft 11','5ft','5ft 1','5ft 2','5ft 3','5ft 4','5ft 5','5ft 6','5ft 7','5ft 8','5ft 9','5ft 9','5ft 10',
  '5ft 11','6ft','6ft 1','6ft 2','6ft 3','6ft 4','6ft 5','6ft 6','6ft 7','6ft 8','6ft 9','6ft 10','6ft 11','7ft'];

  constructor(private imagePicker: ImagePicker) {
   }

  ngOnInit() {
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
  swipeNext(){
    this.slides.slideNext();
  }
  swipeBack(){
    this.slides.slidePrev();
  }

}
