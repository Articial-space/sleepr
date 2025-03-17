#Set the image as node alpine follow by development stage
FROM node:alpine AS development

#Specify the working directory
WORKDIR /usr/src/app

#COPY package.json into the working directory
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

#install pnpm globally
RUN npm install -g pnpm

RUN pnpm install

COPY apps/payments apps/payments
COPY libs libs

RUN cd apps/payments && pnpm install

RUN pnpm run build payments

FROM node:alpine AS production

ARG NODE_ENV=production
#Expose this as env variable
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm
#prod flag ensure that only the depencies inside the object dependencies in the package.json will be install (not the one in devDependencies). It also help the image lighter
RUN pnpm install --prod

#COPY from the development stage the ./usr/src/app/dist to ./dist folder
COPY --from=development /usr/src/app/dist ./dist

CMD [ "node", "dist/apps/payments/main"]

#Note: all the microservice will likely to have the same dockerfile, the only different is the last CMD row where we need to change where the worker app point to. 