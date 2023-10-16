If you run npm run dev you will be able to use concurrently so that both the client and server will be ran at the same time. 
If you are interested in just the frontend or just the backend you can see more instructions on how each is ran.
More instructions to run the client and server will be provided within each folder's directory.
# Fullstack Blog Application
<a name="top"></a>
This is a fullstack applcition made for a blog. The client side application was built with React, Typescript, Redux Tool Kit, and Socket-io.client.
The server side application was built with Node.js, Express, and used MongoDB/Mongoose as the choice of database.

# Table of contents
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <!-- <li><a href="#wireframe">Wireframe</a></li> -->
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

# About the Project
<a name="about-the-project"></a>
This website is to present my portfolio to anyone interested.
<p align="left">(<a href="#top">back to top</a>)</p>

## Getting Started
<a name="getting-started"></a>
To get started follow these steps

### Prerequisites
<a name="prerequisites"></a>
* npm
  ```
  npm install npm@latest -g
  ```

### Installation
<a name="installation"></a>

1. Clone the repo
  ```she
  git clone https://github.com/javiguerra777/fullstack-blog-app
  ```
2. Install npm packages
  ```sh
  npm install
  ```
3. npm run dev to run the entire application together
```
npm start
```
If you want to just run the client side application follow these commands
```
cd client
npm start
```
<p align="left">(<a href="#top">back to top</a>)</p>

## Contributing
If you have a suggestion that could improve this project, please fork the repo and create a pull request. You can simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thank you!

1. Fork the project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m "message")
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request
<p align="left">(<a href="#top">back to top</a>)</p>

## Deploying
This website is deployed on github and uses github pages to be able to properly deploy this site use the following steps.

1. Make sure it's being deployed from the development branch
```
git switch development
```
2. Make sure to run the predeploy in the CLI to run a build
```
npm run predeploy
```
3. Lastly run npm deploy so the build will get published to github pages properly
```
npm run deploy
```

## Contact
<a name="contact"></a>
Javier Guerra - javier.guerra1001@gmail.com

Project link: https://github.com/javiguerra777/fullstack- blog-app
<p align="left">(<a href="#top">back to top</a>)</p>
