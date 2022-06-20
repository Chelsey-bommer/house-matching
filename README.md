# About Housing-match

Housing-Match is a matching app, that matches you to your perfect house. By giving your preferences in your budget and where you want to live, you get the most fitting result. You can save these preferences by making an account. After reviewing the house and information about the house, you can decide if this is the match for you! 

The most important reason that House-matching is being made, is to make the process of looking for a new house easier. Because of the API's Rooms uses, and giving your own preferences, you get the most relevant searches to match with!


## Table of contents

- [Installing the app](#Installeren)
- [Installing Nodejs] (#Nodejs)
- [Makers](#Makers)
- [License](#License)

## Installing

### Nodejs
For this application you will need _node.js_. To install Nodejs, follow this guide:

1. In your terminal, run the following command:
 
`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash`

2. Restart the terminal and run:
 
`nvm install stable`

Want to check if you were succesfull? Run:

`node --v`

<br>

### Installing the app

To install the Housing-match app locally:

1. Clone the repository to your own computer

   `git clone https://github.com/Michelwas97/Housing-match`

2. Install the packages

   `npm install `

<br> 
 
**Environment variables**

1.  Download [dotenv](https://www.npmjs.com/package/dotenv) to be able to add your own environment variables.

    `# npm install dotenv --save`

2.  In the repository, there is an envexample file. Make this into an .env file van and add your own environment variables from your databse, like in the example file. Check if these work with the env variables in your database link. If it works, the terminal should say "Connectie met database succesvol". 

<br>

**Optional packages**

Packages that aren't necessary, but nice to use for this repo:

1. [Nodemon](https://www.npmjs.com/package/nodemon). Nodemon restarts the server automatically, after making any changes. After installation, run `npm run dev` to use Nodemon.
2. [Prettier](https://prettier.io/) & [ESLint]([https://standardjs.com/](https://eslint.org/)). These are linters and formatters, read more about these in our wiki.

<br>

## Makers

The makers of this app are Michel Wassing, Zaid El Boustani and  Chelsey Bommer. They are second year students at the Amsterdam University of Applied Sciences.


## License

[MIT](https://opensource.org/licenses/MIT)
