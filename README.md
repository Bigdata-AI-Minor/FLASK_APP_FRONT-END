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
This repository is made with vue.js and javascript as a web app aplication. For this you need NPM and Vue CLI, for installing that you can find it here: 
-> https://cli.vuejs.org/guide/installation.html
-> https://docs.npmjs.com/downloading-and-installing-node-js-and-npm. 

If you have installed both, you can you the front-end application with:
```sh
npm run dev
```

The front-end application can be found in your browser at the link below:
```sh
http://localhost:5173/
```

This is only in the front-end, for fully working application with prediction, you need to run the backend application in the enviroment. For more info check: https://github.com/Bigdata-AI-Minor/Flask_app
