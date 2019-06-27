# Bird Spotter

Bird Spotter is a full-stack Node.js app for bird enthusiasts. It allows users to register, create a profile page, edit their description and add bird snaps. All bird routes have full CRUD features. Bird Spotter user NoSQL, MongoDB as its database. The app also uses Google Maps to plot out locations of where pics where taken. 


To use locally:

1. Clone the repo and run npm i to install all packages

2. Create a .env file in the root folder with 

GEOCODER_API_KEY=<br/>
PORT=<br/>
SECRET=<br/>
MONGODB_URL=<br/>

listed and your own values to each key (create environment variables) for each. Remember, none of the values can have quotes or spaces. You'll need to have MongoDB installed. Also, you'll need two Google Maps geocoder API keys, one hidden (added to .env) and one unhidden, added to the views/birds/show page at 
<script async defer src="https://maps.googleapis.com/maps/api/js?key=<YOUR API KEY>&callback=initMap"></script>
if you want to use the Google Maps location feature. It's not necessary but it adds to the user experience.

3. Run 'npm run dev' or 'nodemon' to use Nodemon or npm run start in production.

4. Enjoy!

![Settings Window](https://res.cloudinary.com/angelrodriguez/image/upload/v1560423990/Screen_Shot_2019-06-13_at_6.59.09_AM.png)

![Settings Window](https://res.cloudinary.com/angelrodriguez/image/upload/v1560423990/Screen_Shot_2019-06-13_at_7.02.07_AM.png)

![Settings Window](https://res.cloudinary.com/angelrodriguez/image/upload/v1560423990/Screen_Shot_2019-06-13_at_7.05.20_AM.png)

![Settings Window](https://res.cloudinary.com/angelrodriguez/image/upload/v1560423990/Screen_Shot_2019-06-13_at_7.04.58_AM.png)

![Settings Window](https://res.cloudinary.com/angelrodriguez/image/upload/v1560423988/Screen_Shot_2019-06-13_at_7.05.28_AM.png)
