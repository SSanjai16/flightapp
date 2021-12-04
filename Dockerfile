FROM node:12.16.1-alpine As builder

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run run:dev

FROM tomcat:8.5-alpine

COPY --from=builder /usr/src/app/dist/flightapp/ /usr/local/tomcat/webapps/newairplaneapp/

COPY airplane.war /usr/local/tomcat/webapps/
