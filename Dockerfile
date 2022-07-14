FROM node:14-alpine as builder

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --production=true --frozen-lockfile
RUN yarn global add @nestjs/cli

COPY tsconfig.json tsconfig.build.json ./
COPY src ./src
RUN yarn build

FROM node:14-alpine

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --production=true --frozen-lockfile
RUN yarn global add @nestjs/cli

COPY --from=builder /usr/src/app/dist /usr/src/app/dist

CMD [ "yarn", "start:prod" ]
