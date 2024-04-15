var idx,shape,w,h;
var size=20;
var shape_arr=['blue triangle','pink circle','yellow heart','green hexagon','orange pentagon','purple hexagon'];

class RandomShapeGenerator{
  
  constructor(img_arr,have_text){
    this.img_arr = img_arr;
    this.have_text = have_text;
  }

  generate(count){
    if (count > 0 && count % 100 === 0){
      idx=int(random(0,5));
      w = random(100,width-100);
      h = random(100,height-100);
      image(this.img_arr[idx],w,h);
      
      if(this.have_text){
        text(shape_arr[idx],w,h,20,20);
      }
    }
  }
}