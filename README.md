
<!-- PROJECT Header -->
<br />
<div align="center">
  <h3 align="center">Fullstack Blog Application</h3>
  <p align="center">
    An awesome Blog App to share what you are thinking about!
    <br />
    <!-- <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a> -->
</div>
<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#wireframe">Wireframe</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>
<!-- ABOUT THE PROJECT -->
## About The Project
This app build with the existing knowledge of the React basics, and give you further practice working with codebase linting, component testing, Redux Toolkit, and TypeScript. A user should, at the bare minimum, be able to view all posts, add a post, and delete a post. Consider adding the ability to update existing posts, add and set categories on blog posts, specify users, etc.
This app used Redux Toolkit and state slices to manage any state data needed across multiple components. In the case where data is created and used only within one component (or possibly one and a few of its direct children), consider using useState() or useReducer() and traditional prop drilling. Most apps will use a combination of "local" state management (useState() and useReducer()) and "global" state management (Redux or Context API).
Apply the TypeScript static typing system. try to use TypeScript for the majority of React components! installed typescript, add support for TypeScript linting, and use either .ts or .tsx extension for the files to apply TypeScript type-checking on.
Use the `BLANK_README.md` to get started.
<p align="right">(<a href="#readme-top">back to top</a>)</p>
### Built With
A few of the frameworks/libraries that were used to build the project are:
* [![React][React.js]][React-url]
* [![Express][Express.js]][Express-url]
* Node.js
* React Redux 
* Axios
* React Router
* JWT Authentication 
* Bcrypt
* Mongoose
* MongoDB
* EsLint and AirBnb
* socket.io
<p align="right">(<a href="#readme-top">back to top</a>)</p>
### wireframe
  ### Getting Started The App build out with simple wireframes using Figma.
<img width="328" alt="wirefram-backend-blog-app" src="https://user-images.githubusercontent.com/82465149/180460410-39180527-3b74-4d7e-b22f-9551114f2e25.png">
<!-- GETTING STARTED -->
## Getting Started
This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.
### Prerequisites
* npm
  ```sh
  npm install npm@latest -g
  ```
### Installation
_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._
1. Get a free account at for MongoDB to create your own collection and add it to your .env file to connect your API to your DB
2. Clone the repo
   ```sh
   git clone https://github.com/sisay2405/fullstack-react-blog-app
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your mongoDB link in your `.env` file in your backend and also enter your token secret key (can be any text you decide on)
   ```js
   DATABASE_URL = 'ENTER YOUR LINK';
   TOKEN_SECRET = 'ENTER YOUR TOKEN SECRET'
   ```
5. npm start for both your frontend and backend
  ```sh
   cd client 
   npm start 
   ```
  ```sh
   cd server 
   npm start 
   ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>
<!-- USAGE EXAMPLES -->
## Usage
Can be used to post your create your own blog web app and share it with your community. You can:
- [x] View Posts
- [x] Add Posts
- [x] Delete Posts
- [x] Edit Posts
- [x] Add Categories
- [x] Filter By Categories
- [x] User Sign In/Sign Up
    - [x] To add posts you will need to sign in/sign up
    - [x] To add categories you will need to sign in/sign up
<p align="right">(<a href="#readme-top">back to top</a>)</p>
<!-- CONTACT
## Contact
Javier Guerra - jaguerra@alphaworks.tech
Tyler Davis -
Abel - 
Project Link: []
<p align="right">(<a href="#readme-top">back to top</a>)</p> -->
