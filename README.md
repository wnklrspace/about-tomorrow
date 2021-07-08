# muse case labs website

## Setup development environment (Mac OS X)

**Install [nvm](https://github.com/creationix/nvm)**

Follow the setup instructions to add `nvm.sh` to `.zshrc`, `.bashrc` or whatever you use.

**Install node & npm**

```bash
nvm install v12.16.3
nvm alias default v12.16.3
```

**Install gulp**

```bash
npm install --global gulp-cli
npm install gulp@4.0.0
```

**Install dependencies**

```bash
npm install
```

## Run for development

```bash
npm run dev
```

## build

```bash
npm run build
```

## deploy
What it does:
- git checkout main
- git merge develop
- git push
- git checkout develop

```bash
npm run deploy
```
