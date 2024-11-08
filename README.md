# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Start

### 1. Downloading

```
git clone {repository URL}
```

### 2. Create .env file
> (based on .env.example): ./.env

### 3. Installing NPM modules

```shell
npm install
```

### 4. Deploy prisma

```shell
npx prisma migrate deploy
```

### 5. Running application

```shell
npm start
```

## How to use

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/api/.

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
