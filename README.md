front-end is made in vue.js
BigData en AI minor
==================================
In this focus we will focus on taking a picture and sending it to the back-end. 
After that we will get a response back from the back-end which we will display.
The application will ask for premission to use the camera and access the location. 
If those tose are not accepted there cannot be made a picture and the application will not be used

==================================

This application works as follow:
  - a user thake a picture
  - the picture is saved locally on the system
  - the picuture is send to the back-end
  - the back-end send back a prediction
  - user can accept that the prediction is correct or modify it
  - the image can be displayed in the library
  - the image details can viewed after clicking on them; e.g. longtitude, latitude, classification
  - the image can be deleted
  - the image can be downloaded
  - the upload history can be seen of the uploaded images 

==================================
# FLASK_APP_FRONT-END
This repository is made with vue.js and javascript as a web app aplication. For this you need NPM, Node.js and Vue CLI, for installing that you can find it here:  
  \-> https://cli.vuejs.org/guide/installation.html  
   -> https://docs.npmjs.com/downloading-and-installing-node-js-and-npm. 

The NPM version used: 9.6.4\
The Node version used: v16.13.2

If you have installed both, you can install Visual Studio Code as Editor: \
  -> https://code.visualstudio.com/download

After the steps above the required software is installed. 
The next steps are:
1. Clone this Repository with gitbash or download the zip which contains the project
2. Open the project in visual studio code
3. After that is done continue whith the steps below.

Now you can start the front-end application with in the terminal of visual studio code:
```sh
npm run dev
```

The front-end application can be found in your browser at the link below:
```sh
http://localhost:5173/
```

This is only in the front-end, for fully working application with prediction, you need to run the backend application in the enviroment. So the two project have to run at the same time. For that you can open both projects in a new window of Visual studio code and make them run. \
For more info check: https://github.com/Bigdata-AI-Minor/Flask_app
