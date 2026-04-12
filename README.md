# Password Generator Portal

![GitHub repo size](https://img.shields.io/github/repo-size/lfernandez79/pwdGenerator?color=orange&logo=javascript)
[![Netlify Status](https://api.netlify.com/api/v1/badges/ba2d4473-cac2-4651-8e04-33f0e6418493/deploy-status)](https://app.netlify.com/sites/pwdg/deploys)

A vanilla JavaScript webapp that generates secure random passwords based on user-selected criteria. Runs in the browser — no backend, no dependencies, no build step.

## [Launch it!](https://pwdg.netlify.app/)

## Features

- Cryptographically secure generation via `crypto.getRandomValues()`
- Adjustable length (8–30 characters)
- Selectable character types: uppercase, lowercase, numbers, symbols
- One-click copy to clipboard
- 10-second auto-clear countdown
- Accessible (ARIA live regions, labeled controls)
- PWA-ready (Add to Home Screen on mobile)

## Tech Stack

- HTML5, CSS3, vanilla JavaScript (ES module)
- Bootstrap 4.6.0 + Bootswatch theme
- Font Awesome icons
- Deployed on Netlify (auto-deploy from `master`)

## Screenshots

| v1 | v2 | Mobile |
|----|-----|--------|
| <img src="public/assets/image/PG.png" width="350"> | <img src="public/assets/image/PG2.png" width="350"> | <img src="public/assets/image/mobilePG.png" width="150"> |

## License

MIT
