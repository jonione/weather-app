This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Weather App

Quick ReactJS-setup using OpenWeatherMap-api and GSAP-animation-library. Getting default city is created with Firebase-database.
The background-color reflects temperatures from blue to red by manipulating RGB-values. Animated arrow indicates wind's degrees.

### `Instructions`

Type wanted city name to input form, and press "search"-button. It fires fetch to OpenWeatherMap-api and animations.
There will appear buttons to set the just requested city as a default (so the application remembers that next time on initialization) or reset the query and displayed data.

### `Structure`

App.js uses DataRequest-class which has child-component DataContainer. Structure could be better - couple times had to use callback-functions between parent and child.

### `More`

Would have created preview list of cities when typing, but for example the json-file consisting all city names and ID's was about 28 mb's big. Didn't have much time of testing the queries from that file moved to personal server or getting familiar with OpenWeatherMap's api.

Bug when passing unknown city to search. That could be fixed for example with that recommended city list when typing.
