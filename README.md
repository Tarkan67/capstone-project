# Welcome to the App GeoGameGuesser - Capstone Project

### This is a capstone project for the web development bootcamp of [neuefische](https://www.neuefische.de/)

GeoGameGuesser challenges the player to guess their favorite locations in the award winning game Elden Ring

- Locations with a panorama view
- interactive gamemap
- Leaderboard with a point system
- different playable levels

## How to play

When you open [GeoGameGuesser](https://capstone-project-eight-brown.vercel.app/) you will start at the landingpage and see every playable level

There are several features in GeoGameGuesser:

### Landingpage

- By clicking on "leaderboard" on the navbar, you are presented with a leaderboard that shows every player
- By clicking on the avatar, a popup will show user information and a logout button
- Each card will lead to another playable level with 5 locations, after making 5 guesses the user will automatically return to the landingpage

### Level

- In the level the user can submit their guesses and will be presented with an alert after each guess that show how much points he earned or not
- there are 5 locations which are shown as a panorama background picture, the user can also navigate through the panorama by dragging
- by double clicking the map it expends
- by single clicking on the map the user will set a marker
- after setting a marker the user can submit their answer

The Userdata is stored in the MongoDB along with their earned points

The User can log in with GitHub

## Tech Stack

- React
- Next.js
- Material UI
- SWR
- React Leaflet
- Leaflet
- mongoDB
- mongoose
