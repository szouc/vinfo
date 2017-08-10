# vinfo

## start server-end devServer

- "start": "yarn dev:start",
- "dev:start": "nodemon -e js,jsx --ignore lib --ignore dist --exec babel-node src/server",

## start front-end devServer

- "dev:wds": "webpack-dev-server --progress",

## delete dist files & directories and rebuild

- "prod:build": "rimraf lib dist && babel src -d lib --ignore .test.js && cross-env NODE_ENV=production webpack -p --progress",

## bundle server-end prodServer

- "bundle:server": "cross-env NODE_ENV=production babel-node tools/serverBundle --release --analyze",

## run server-end prodServer and manage

- "prod:start": "cross-env NODE_ENV=production pm2 start lib/server && pm2 logs",
- "prod:stop": "pm2 delete server",

## lint src files and webpack config file

- "lint": "eslint src webpack.config.babel.js --ext .js,.jsx",

## lint && flow && jest

- "test": "yarn lint && flow && jest --coverage",

## hooks for git

- "precommit": "yarn test",
- "prepush": "yarn test && yarn prod:build