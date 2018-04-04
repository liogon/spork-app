# Spork App

A minimum boilerplate to deliver Spork App using Polymer 3.x.

------

## Requirement
Should run on Node JS version 8.x and greater
```
$ nvm install 8.9.4
```

If you want to use and deploy in Firebase
```
$ npm i -g firebase-tools
```

------

## Usage
So you have installed Node JS (and optionally install firebase-tools).

To automatically create the spork architecture on your project, clone this repository

Type
```
$ git clone git@bitbucket.org:noocleus/spork-skeleton.git [your-app-name]
```

Remove the `.git` folder and change details within:
- `package.json`
  - change the name of the project
  - change description of the project
  - change the version of the project
  - update the git url
- `src/manifest.json`
  - change the name of the project
  - change the short name (max 20 characters) of the project
  - change start_url of the project
  - change display
  - change theme_color
  - change background_color
  - set the icons

Then start building your application
```
$ npm i
```

------

## Developing
To start developing
```
$ npm run dev
```

In development, the system will run from the development server and will not show up on the public folder.
You can access the site you are developing at `http://localhost:3000`

------

## Production
To build a production version
```
$ npm run prod
```

All output will be put in the public folder.

------

## Project Structure

The project structure is as follows:
```
- config
  - utils             // utilities that is needed to build the project, based on page.json
  - page.json         // defines the routing definition of the project

- public              // production build folder for deployment
- src                 // where you can find your development source codes

  - assets            // where you put all media and assets that you need
    - fonts           // where you put all your fonts
    - icons           // where you put all icons
    - media           // where you put all images and videos
    - svg             // where you put all your svgs

  - components        // where you put all component dependencies that are not installable from npm
  - pages             // where you put all pages (fragments)
  - index.ejs         // the index.html shell
  - index.js          // the core bundle app-shell
  - manifest.json     // manifest.json for editing the browser behavior: See https://goo.gl/OOhYW5

- .eslintrc.js        // linting configurations
- .gitignore          // configuration for ignoring files for github
- package.json        // npm packages configuration
- postcss.config.js   // css configuration for webpack
- webpack-module.js   // modules part of webpack
- webpack-plugin.js   // plugins part of webpack
- webpack.config.js   // configuration file for running the webpack

```

------

## Deploying in Firebase
Install firebase-tools and login using firebase
```
$ firebase login
```

Then initialize the app to pick the project in firebase (don't add replace files)
```
$ firebase init
```

Test the app before deploying
```
$ firebase serve --only hosting
```

Deploy the app
```
$ firebase deploy --only hosting
```

------

## How to add a component (npm installable)
You need to install the component using npm
```
$ npm i --save component-name
```

You import it in your file (index.js)
```js
import 'component-name'
```

You add the component in the template
```html
<component-name></component-name>
```

------

## How to add and create a component (from the components folder)
copy the example component from the components folder
```
$ cp -r ./src/components/component-sample ./src/components/[component-name]
```

edit the name of the component in the new component ([component-name]/index.js)
```js
static get is () { return 'component-sample'; }
```
to
```js
  static get is () { return '[component-name]'; }
```

You import it in your file (index.js)
```js
import '[component-name]'
```

You add the component in the template
```html
<component-name></component-name>
```

------

## How to create and add a page
copy the example page from the pages folder
```
$ cp -r ./src/page/page-sample ./src/pages/[page-name]
```

edit the name of the page in the new page ([page-name]/index.js)
```js
static get is () { return 'page-sample'; }
```
to
```js
  static get is () { return '[page-name]'; }
```

------

## How to add a route in a page
Adding a route is easy, open the file `config.page.json`, you can see an example...

```js
[
  {
    "route": "/",
    "page": "page-home",
    "title": "Home"
  },

  ...

  {
    "route": "/sample",
    "page": "page-sample",
    "title": "Sample"
  }
]
```

adding a route is adding this object in the array

```js
  {
    "route": "/sample", // this is the route. So that means, you can access the page via /sample
    "page": "page-sample", // this is the page component
    "title": "Sample" // this is the name of the page
  }
```
