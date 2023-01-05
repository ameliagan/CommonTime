# CommonTime
Syncing time perception through BCI and AR.

This application uses the Emotiv device to synchronize the perception of time between two users through augmented reality (AR). The Emotiv device is able to detect and interpret brain signals, and this application uses machine learning techniques to analyze these signals and control the visual display of a video feed from the user's camera. The ml5.js library's body segmentation model is used to keep the person in focus or out of focus depending on the wearer's mental state, and the opposite user is made in focus or out of focus accordingly. This creates an immersive AR experience where the two users' perceptions of time are interconnected.

Using p5.js and node.js, The app.js file sets up a server and a socket connection to stream data from the Emotiv device to the client, where it is used to control the visual display of a video feed from the user's webcam. The sketch.js file contains the p5.js code that runs the client-side visualization, using the ml5.js library for body segmentation and the socket connection to receive data from the Emotiv device.

<img src="https://user-images.githubusercontent.com/121802839/210760556-39b7c78e-9cb8-44af-a977-8807d455b911.jpg" width="300">

## Requirements
To run this application, you will need the following:

A computer with node.js and npm installed,an Emotiv device, a webcam.

## Installation
Clone or download the repository to your local machine.
In a terminal window, navigate to the root directory of the project.
Run npm install to install the necessary dependencies.
Connect the Emotiv device to the computer and ensure that it is recognized by the operating system.
Find the COM port that the Emotiv device is connected to (e.g. COM6).
Open the app.js file and update the 'COM6' argument in the var port = new SerialPort('COM6',{ ... }); line to the correct COM port for your device.
In the terminal, run node app.js to start the server.
Open a web browser and navigate to http://localhost:3000 to view the application.

## How it works
The app.js file sets up a server and a socket connection using the node.js http and socket.io modules. It also sets up a serial connection to the Emotiv device using the serialport module.

The server listens for HTTP requests and serves the index.html and sketch.js files as responses. The sketch.js file contains the p5.js code that runs the client-side visualization.

The socket connection is used to stream data from the Emotiv device to the client. The serial connection is used to receive data from the Emotiv device and emit it over the socket connection. The data is received and processed on the client side using p5.js and ml5.js to control the visual display of the video feed.

The preload() function loads the ml5.js body segmentation model, and the setup() function sets up the canvas, video capture, and event listeners. The draw() function is called repeatedly by p5.js and ml5.js to control the visual display of the video feed.

## Demo without Emotiv: 

[Unfocused State of Mind](https://ameliagan.xyz/5.html)

[Focused State of Mind](https://ameliagan.xyz/3.html)

## More Info 
[Common Time](https://ameliagan.com/responsive-environment)

