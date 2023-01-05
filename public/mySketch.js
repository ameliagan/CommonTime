var socket = io();
let bodypix;
let video;
let segmentation;
let opacity = 0;
let newVariable;

// var constraints = {
//     audio: false,
//     video: {
//       facingMode: {
//         exact: "user"
//       }
//     }    
//     //video: {
//       //facingMode: "user" or "environment"
//     //} 
//   };

socket.on('data', function (data) {
    document.getElementById('sample').style.opacity = data;
    opacity = data;
    console.log(data);
    // document.getElementById('sample').innerHTML = data;
});

const options = {
    outputStride: 8, // 8, 16, or 32, default is 16
    segmentationThreshold: 0.5, // 0 - 1, defaults to 0.5
};

function preload() {
    bodypix = ml5.bodyPix(options);
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    video = createCapture(VIDEO, videoReady);
    // video = createCapture(constraints, videoReady);

    video.size(windowWidth, windowHeight);
    video.position (0,0);
    video.style ('z-index','-1');

    // video.etl.setAttribute('playsinline', '');

    // video.hide();
}

function videoReady() {
    bodypix.segment(video, gotResults);
}

function draw() {
    //super not focus
    if (opacity <= 20) {
        if (segmentation) {
        image(segmentation.personMask, 0, 0, windowWidth, windowHeight);
        }
    }

    //not focus
    else if (opacity >= 20 && opacity <=40) {
        if (segmentation) {
        image(segmentation.backgroundMask, 0, 0, windowWidth, windowHeight);
        }
    }

    //focus = normal mode
    else if (opacity >=40 && opacity <=80) {
        image(video, 0, 0, windowWidth, windowHeight);
        
    }
        
    //super focus - video works 
     else if (opacity >=80) {
        background('rgba(255,255,255, 0.2)');
        if (segmentation) {
            image(segmentation.backgroundMask, 0, 0, windowWidth, windowHeight);
            }
        // clear();
    }

    function mousePressed() {
        save('myCanvas.png');
        return false;
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