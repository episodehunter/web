# Episodehunter Web [![codecov](https://codecov.io/gh/episodehunter/web/branch/master/graph/badge.svg)](https://codecov.io/gh/episodehunter/web)

> The web client for Episodehunter

This repo contains the web client for [episodehunter.tv](https://episodehunter.tv). The backend and other clients are in the [mono repo](https://github.com/episodehunter/episodehunter).

## Developing 🛠

First clone the repo by `git clone https://github.com/episodehunter/web.git`. Run then install all dependencies by running `npm install`, this will automatically create the file `src/dragonstone.tsx` which is generated from the GraphQL documents in `src/data-querys`. You have to manually run `npm run generate` if you make any change in `src/data-querys`.

### Run the application localy ⚙️

Just run `npm start` and visit [`http://localhost:1337`](http://localhost:1337). You can just your normal email and password to login.

### Deploy 🚀

The app is automatically deployd for every push to `master` (given that test, lint and build succeeds)

### FE Stack 🥞

We are using:

- Webpack for building and local development
- React as view layer
- Typescript as primary language
- [`Apollo client`](https://www.apollographql.com/docs/react/) for state management and data fetching
