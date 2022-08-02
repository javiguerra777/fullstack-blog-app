The project's backend is written in Javascript.
We decided to use Express, and we used MongoDB as our database.
If you clone this project you will have to create your own .env file to connect to MongoDB and create your own JWT keys as well. We are currently looking into using AWS to handle image storage.
The image storage functionality doesn't work quite just yet. But the rest of the backend works.
Users are able to signup and login, the middleware works for authentication. 
Users can create update and delete posts and categories.
Use npm i to install the proper node modules, if you do not have nodemon installed I would recommend installing nodemon on your computer.