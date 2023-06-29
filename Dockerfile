FROM node:16.13.2-alpine

# Install simple http server for serving static content
RUN npm install -g http-server

# Make the 'app' folder the current working directory
WORKDIR /app

# Copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy project files and folders to the current working directory (i.e., 'app' folder)
COPY . .

# Build app for production with minification
RUN npm run build

# Expose port 5173 (change it to the desired port)
EXPOSE 5173

# Set the command to run when the container starts
CMD [ "http-server", "dist", "-p", "5173", "-c-1", "index.html" ]

