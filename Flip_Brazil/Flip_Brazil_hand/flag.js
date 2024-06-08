class Flag{

  flag_wave(flag) {
    // background(0);
    let gap = 6;
    let freq = 0.06;
    let amount = 3.5;
    let anim = millis()*0.003;
    for(let y= gap/2;y<height;y+=gap){
      for(let x= gap/2; x<width; x +=gap){

        let c = flag_img.get(x,y);
        let distance = dist(450,450,x,y);
        let wave = sin(distance*freq-anim)*amount;
        let xWave = x+wave;
        let yWave = y+wave;
        c[3] = 200;
        fill(c);
        ellipse(xWave,yWave,gap*0.7);
      }
    }

  }
}