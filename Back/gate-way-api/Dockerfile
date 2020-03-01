FROM node:13.8.0-alpine3.11
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install any needed packages
RUN npm install

# Bundle app source
COPY . .

# Stage 2 build for creating smaller image
# FROM node:13.8.0-alpine3.11
# WORKDIR /usr/src/app

# COPY --from=builder /usr/src/app .

EXPOSE 3000
