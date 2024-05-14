FROM node:lts

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# copy run script
COPY run.sh run.sh

RUN npm install

# Bundle app source
COPY . .

VOLUME [ "/usr/src/app" ]

EXPOSE 4000
CMD ./run.sh