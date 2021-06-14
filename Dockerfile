# Use NodeJS base image
FROM node:13

# Create app directory
WORKDIR /usr/src/app

#copy app config files, package.json and package-lock.json
COPY package*.json ./

#install dependencies
RUN npm i

# Copy app source
COPY ./ ./

# Bind the port that the image will run on
EXPOSE 3000

# Define the Docker image's behavior at runtime
CMD ["node", "app.js"]

