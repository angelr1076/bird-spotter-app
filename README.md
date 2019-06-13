# Bird Spotter

Bird Spotter is a full-stack Node.js app for bird enthusiasts. It allows users to register, create a profile page. All bird routes have full CRUD features. The app also uses Google Maps to plot out locations of where the pics where taken. 

The live Heroku site is coming soon!

To use locally:

1. Clone the repo and run npm i to install all packages

2. Create a .env file with 

GEOCODER_API_KEY=

PORT=

SECRET=

MONGODB_URL=

listed and your own values for each. Remember, none of the values can have quotes or spaces. You'll need to have MongoDB installed, even if you want to run locally. Also, you'll need two Google Maps geocoder API keys, one hidden (added to .env) and one unhidden, added to the views/birds/show page at 
<script async defer src="https://maps.googleapis.com/maps/api/js?key=<YOUR API KEY>&callback=initMap"></script>
if you want to use the Google Maps location feature.

3. Run npm run dev to use Nodemon or npm run start in production.
4. Enjoy!

![Settings Window](https://res.cloudinary.com/angelrodriguez/image/upload/v1560423990/Screen_Shot_2019-06-13_at_6.59.09_AM.png)

![Settings Window](https://res.cloudinary.com/angelrodriguez/image/upload/v1560423990/Screen_Shot_2019-06-13_at_7.02.07_AM.png)

![Settings Window](https://res.cloudinary.com/angelrodriguez/image/upload/v1560423990/Screen_Shot_2019-06-13_at_7.05.20_AM.png)

![Settings Window](https://res.cloudinary.com/angelrodriguez/image/upload/v1560423990/Screen_Shot_2019-06-13_at_7.04.58_AM.png)

![Settings Window](https://res.cloudinary.com/angelrodriguez/image/upload/v1560423988/Screen_Shot_2019-06-13_at_7.05.28_AM.png)
