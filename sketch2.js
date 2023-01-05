
let bodypix;
let video;
let segmentation;
let pg;

const options = {
  outputStride: 8, // 8, 16, or 32, default is 16
  segmentationThreshold: 0.5, // 0 - 1, defaults to 0.5
};

function preload() {
  bodypix = ml5.bodyPix(options);
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  // canvas.style('z-index','-1');
  // canvas.parent('canvasContainer');
  // load up your video
  video = createCapture(VIDEO, videoReady);
  video.size(windowWidth, windowHeight);
  video.position (0,0);
  video.style ('z-index','-1');

  pg = createGraphics(windowWidth, windowHeight);
  
  // video.hide();
}

function videoReady() {
  bodypix.segment(video, gotResults);
}


function draw() {
  
  // video.loadPixels();
  // background('rgba(255,255,255, 0.2)');
  // tint(255,200);
  noFill();
  if (segmentation) {
  
    // console.log( segmentation.personMask);
    /*
    let img = createImage(320, 240);
    img.loadPixels();
    
    let back = segmentation.personMask;
    back.loadPixels();
    for (let i = 0; i < back.width; i++) {
      for (let j = 0; j < back.height; j++) {
        let col = back.get(i, j);
        img.set(i, j, color(col[0], col[1], col[3], 0.5));
      }
    }
    img.updatePixels();
    // console.log(c);
    image(img, 0,0);
    */
    // image(segmentation.personMask, 0, 0, width,height);
    
    
    image(segmentation.backgroundMask, 0, 0, width,height);

    // var w = videoReady.width; 
    // var h = videoReady.height;

    // copy(videoReady, width/2, 0,20,height,x,0,20,height)
  
  }
  
}

function gotResults(error, result) {
  if (error) {
    console.log(error);
    return;
  }
  segmentation = result;
  bodypix.segment(video, gotResults);
}

function mousePressed(){
     
  save('myCanvas.png');
  return false;
}
