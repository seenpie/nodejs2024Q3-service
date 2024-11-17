# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker desktop - [Download Docker desktop](https://www.docker.com/products/docker-desktop/)

## Start

### 1. Downloading

```
git clone https://github.com/seenpie/nodejs2024Q3-service.git -b part-2
```

### 2. Create .env file

> (based on .env.example): ./.env

### 3. Installing NPM modules

```shell
npm install
```

### 4. Running application

> Application will deploy in Docker with local node_modules and src folder

```shell
docker compose up
```

## How to use

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/api/.

## Docker scan

You can run script for vulnerabilities scanning

```shell
npm run docker:scan
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
