# Base image
FROM node:18.16.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that your Express.js app listens on
EXPOSE 3002

# Start the application
CMD [ "npm", "start" ]
