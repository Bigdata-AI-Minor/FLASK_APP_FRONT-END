# Flask_app_frontend

This readme will cover the two ways of setting up the front-end of the application.

There are 2 option for setting up the frondend application. One is setting up natively by setting the environment up or setting up the docker container where in the dependencies are contained.

This is only in the front-end, for fully working application with prediction, you need to run the backend application in the enviroment. So the two project have to run at the same time. For that you can open both projects in a new window of Visual studio code and make them run.
For more info check: https://github.com/Bigdata-AI-Minor/Flask_app


# Native platform Windows
This repository is made with vue.js and javascript as a web app application. For that you need the following environment packages and a IDE with a build terminal (you can also use the CMD):
```sh
NPM
https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
Nodejs v16.13.2
https://nodejs.org/download/release/v16.20.1/
Vue CLI 9.6.4
https://cli.vuejs.org/guide/installation.html  
VSCode
https://code.visualstudio.com/download
```

After the steps above the required software is installed. 
The next steps are:
1. Clone this Repository with a CLI or download the zip which contains the project
2. Open the project in visual studio code or another IDE as a project or folder.

For starting the frontend application, use the following command for starting the developer environment wherein you can launch the application:
```sh
npm run dev
```

Now you can navigate to the application in your browser by typing the address in in the navigation bar:
```sh
http://localhost:5173/
```

# Docker
You will need to install docker which contains the environment packages that is needed for this project. You can follow the link below: 
```sh
https://docs.docker.com/engine/install/
```
After installing docker you will need to navigate to the root folder of the project in a CLI. If you open the project in VSCode as a folder, it will automatically open the root folder in the terminal (ctrl + `). For starting the container with the project you need to navigate into the 'flask_app_frontend' folder, you can do that by typing in from the root folder:

```sh 
cd .\flask_app_frontend\
```

inside the folder you can start the docker container by using the following command:
```sh
docker-compose up
```

In docker you will see the container and the status of it. Inside is the environment image that contains the application and the environment packages. If something is not working, you need to delete the container and start the container again.

If the container is running you can visit the application in the browser at the following address:
```sh
http://localhost:5173/
```