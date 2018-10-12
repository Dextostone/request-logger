FROM node:10.9.0-alpine

# Create app directory
WORKDIR /src

# Install app dependencies
ADD package.json /src/package.json
RUN npm install

#Bundle app source
COPY . /src

EXPOSE 9094

CMD npm start
