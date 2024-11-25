FROM node:18-alpine AS builder
WORKDIR /usr/app
COPY package*.json .
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:18-alpine AS DEV
WORKDIR /usr/app
COPY --from=builder /usr/app/node_modules ./node_modules
COPY --from=builder /usr/app/package.json ./package.json
COPY --from=builder /usr/app/package-lock.json ./package-lock.json
COPY --from=builder /usr/app/prisma ./prisma
COPY --from=builder /usr/app/doc ./doc
COPY --from=builder /usr/app/tsconfig.json ./tsconfig.json
COPY --from=builder /usr/app/tsconfig.build.json ./tsconfig.build.json

CMD ["npm", "run", "start:prisma:dev"]

FROM node:18-alpine AS PROD
WORKDIR /usr/app
COPY --from=builder /usr/app/package.json ./package.json
COPY --from=builder /usr/app/package-lock.json ./package-lock.json
COPY --from=builder /usr/app/dist ./dist
COPY --from=builder /usr/app/doc ./doc
COPY --from=builder /usr/app/prisma ./prisma

RUN npm ci --omit=dev

CMD ["npm", "run", "start:prisma:prod"]