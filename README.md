![Capture d'écran 2023-03-08 111345](https://user-images.githubusercontent.com/5593293/223686025-03039501-6210-4032-98e9-cc2cca840a7f.png)


# Vite template builder to quickly generate Threejs code in the browser.

This repository will help creating 3D environment using [Threejs](https://threejs.org/examples/#webgl_animation_keyframes), a powerful WebGL library. It is powered by [Vite](https://vitejs.dev/guide/why.html) ⚡️ that quickly compiles anything you need, it is also including [Sass](https://sass-lang.com/guide), [Babel](https://babeljs.io/), [Eslint](https://eslint.org/), [Prettier](https://prettier.io/), [lil-gui](https://www.npmjs.com/package/lil-gui) and [GSAP](https://greensock.com/docs/) for animations.

It is also including a LoaderManager JS file to easily load your assets: (Image, Textures, 3D models...) in one function.

## [See it live](https://robpayot.github.io/vite-threejs-template/)

## How to install

Clone the repository or download it in zip format, then

### Open Terminial

Navigate to projects folder

Install dependencies

```bash
  npm install
```

Start the dev server

```bash
  npm run dev
```

### Build Project

To build for production

```bash
  npm run build
```

## How to Use

-   Use the 'src' folder for all project files.
    -   HTML
    -   JS
    -   SCSS
-   vite.config.js file sets up project input to 'src' folder.
-   Use eslintrc file to configure linting rules
-   Use prettierrc file to configure formatting rules

## Useful links
- [Threejs docs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene)
- [GSAP docs](https://greensock.com/docs/)
- [Vite docs](https://vitejs.dev/config/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
