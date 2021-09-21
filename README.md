## LoR manager

URL => https://lor-manager.vercel.app/

tech stack used - 

Frontend - react js

backend - Node js

Database - Mongodb

Hosting - Heroku (backend) and Vercel (frontend)

project setup

-> Root folder conist of node project and client folder consist of react project.

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


