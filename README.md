## LoR manager

URL => https://lor-manager.vercel.app/


A small preview.

https://user-images.githubusercontent.com/37527597/235263152-1250608d-da4b-4d32-88c2-aff6d222d912.mp4


tech stack used -

Frontend - react js

backend - Node js

Database - Mongodb

Hosting - Heroku (backend) and Vercel (frontend)

project setup

-> Root folder consist of node project and client folder consist of react project.

-> Run npm install in root and client folder respectively

-> add a .env file in root folder with following structure

```
MONGODB_URL={your mongodb uri}
PORT=5000
JWT_SECRET={random string as jwt secret}
JWT_EXPIRE=1h
EMAIL_SERVICE=SendGrid
EMAIL_USERNAME=apikey
EMAIL_PASSWORD={sendGrid password}
EMAIL_FROM={sender email set on sendgrid}
```

Read SendGrid docs for better understanding of last 4 env variables.

This project was made with the intention to help teachers and students to manage and organize the LoRs required during the application process for MS.
To report ant Bugs, feature request or any feedback/ improvment, create an issue with a description ( screenshot if aplicable ).

Note - Current version of web app is not responsive so use it on laptop or PC. The responsiveness of the app is being worked upon.

Few screenshots below

<p>
  <img src="./screenshots/ss1.PNG">
  <br>
  <img src="./screenshots/ss2.PNG" >
    <br>
  <img src="./screenshots/ss3.PNG">
    <br>
  <img src="./screenshots/ss4.PNG">
    <br>
  <img src="./screenshots/ss5.PNG">

</p>
