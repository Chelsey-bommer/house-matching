# Rooms

Rooms is een matching app die jou matcht aan je perfecte huis of kamer. Door het invoeren van jouw voorkeuren over budget en waar je wilt wonen, krijg je de meest relevante huizen te zien. Hiervan kun je alle informatie bekijken en zo beslissen of het een match is!

De voornaamste reden dat deze app over een huis/kamer zoeken gemaakt wordt, is om het zoekproces naar een nieuw huis makkelijker te maken. Door de API's en het zelf invullen van voorkeuren krijg je de meest relevante huizen om een match mee te maken!


## Table of contents

- [Installing the (web)app](#Installeren)
- [Makers](#Makers)
- [Contact](#Contact)
- [License](#License)


## Installeren

Voor deze applicatie is _node.js_ nodig. Als je dit nog niet hebt zie https://nodejs.dev/learn/how-to-install-nodejs
Om de rooms matching app zelf te installeren en aan te passen, volg de volgende stappen:

1. Clone de repository naar je eigen computer  

   `git clone https://github.com/Chelsey-bommer/Matching-app`

2. Installeer de benodigde packages.

   `npm install `
   
<br> 
 
**Environment variables**

1.  Download [dotenv](https://www.npmjs.com/package/dotenv) om zelf environment variables te kunnen toevoegen.
   
    `# install locally (recommended)
     npm install dotenv --save`
    
2. In de repository zit een envexample file. Maak hier een .env file van en voeg je eigen environment variables van je database toe zoals in de voorbeeld file. Check of deze kloppen met de env variables in de database link. 

<br>

**Optionele packages**

Packages die niet per sé nodig zijn, maar wel handig zijn voor matching-app:
1. [Nodemon](https://www.npmjs.com/package/nodemon). Nodemon restart de server automatisch, nadat er aanpassingen worden gemaakt. Na de installatie, run `npm run dev` om gebruik te maken van Nodemon.
2. [Prettier](https://prettier.io/) & [Standardjs](https://standardjs.com/). Dit zijn linters en formatters, lees meer in de wiki hierover. 

<br>

## Makers

De maker van deze app is Chelsey Bommer. Een 2e jaars student Communication & Multimedia Design aan de Hogeschool van Amsterdam.


## Contact

Chelsey Bommer kan bereikt worden op:

LinkedIn: Chelsey Bommer  
E-mail: chelsey.bommer@hva.nl

## License

[MIT](https://opensource.org/licenses/MIT)
