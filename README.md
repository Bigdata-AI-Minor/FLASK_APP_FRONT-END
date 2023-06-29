This readme will cover the two ways of setting up the front-end of the application.

**Method 1**

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

**Method 2**

You will need to install docker which will set up the environment. You can follow the link below: \
 -> https://docs.docker.com/engine/install/

After installing docker you will need to navigate to the root of the project. This can be done with the command line of windows.
To go to correct directory there is a example below. You will need to modify it the link accordingly to your project location.
```sh
 cd front-end\v2\FLASK_APP_FRONT-END\flask_app_frontend
```
After you are in the current directory you can use the following command in the same terminal:
```sh
docker-compose up
```
After this the evironment is set up and will be available at:
```sh
http://localhost:5173/
```

This is only in the front-end, for fully working application with prediction, you need to run the backend application in the enviroment. So the two project have to run at the same time. For that you can open both projects in a new window of Visual studio code and make them run. \
For more info check: https://github.com/Bigdata-AI-Minor/Flask_app


