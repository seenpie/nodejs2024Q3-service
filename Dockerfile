FROM node:18-alpine AS builder
WORKDIR /usr/app
COPY . .

FROM node:18-alpine
WORKDIR /usr/app
COPY --from=builder /usr/app/package.json ./package.json
COPY --from=builder /usr/app/package-lock.json ./package-lock.json
COPY --from=builder /usr/app/prisma ./prisma
COPY --from=builder /usr/app/doc ./doc
COPY --from=builder /usr/app/tsconfig.json ./tsconfig.json
COPY --from=builder /usr/app/tsconfig.build.json ./tsconfig.build.json

CMD ["npm", "run", "start:docker"]
