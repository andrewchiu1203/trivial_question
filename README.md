Trivial Question
-------------------------

This is an interactive webapp / game that picks 10 random questions from the database for each round and records each player's score. The app allows users to create accounts and login so that they can see their own game stats such as top 5 highest score. <br>

The backend used here is Django and the frontend is React. They communicate through a Django rest-framework to allow React to make API requests to Django. It also serializes the data that's in Python objects into JSON packets so that data can be passed around between the two.

### Frontend Dependancies

- axios
- react-router-dom

### Backend Dependancies
- django
- djangorestframework
- django-cors-headers
