# WcsMoves

A web app to gather the West Coast Swing I already learned :)

_Note_: For now it's still a work in progress in a POC state.

<img width="867" alt="Capture d’écran 2025-04-23 à 00 30 38" src="https://github.com/user-attachments/assets/5e4f1e33-21c0-4d92-8d10-1f3153cdec65" />

## Short term Roadmap

- ~~add deploy on Vercel~~
- ~~add subdomainon my website for a demo URL~~ [Demo Here](https://wcs.adrienmartinet.com/)
- ~~route and component to add a move~~
- l~~ink the web app to firebase to use :~~
  - ~~Firestorage~~
  - ~~Firebase Auth~~
- ~~handle the env tokens and deploy scripts for Vercel~~
- Publish some real moves with meaningful details

## Mid term Roadmap

- handle properly move variations links between moves
- film video for each moves
- add videos on move details

## Ideas

- ability to filter by partner starting or ending connection point
- flow recommendation after a move depending on the ending connection

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.7.

## 🔑 Configure Firebase for Firestore and Auth

Before to lauch the project you need:

- Head to [Firebase console](https://console.firebase.google.com/)
- Create a project and add:
  - Authentication with Google Auth Provider
  - a Firestore Database (I named mine `wcs-moves`) and 2 collections:
    - `danceMoves` refer to DanceMove type
    - `users` : Document refers to the User `uid` and the fields looks like `{ isAdmin: false }`
- Go to your project configuration
- create a `.env` file at the root of your project (you have a `.env.example` file in the project) with the information from your project configuration

It's currently hosted on Vercel on my side, you can easily add ENV variable corresponding to your .env file and you're good to go ✨

## Development server

To start a local development server, run:

```bash
npm run start
```
