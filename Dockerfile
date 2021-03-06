# Use node 10.15.1
FROM node:10.15.1

# Copy source code
COPY . /app

# Change working directory
WORKDIR /app

# Install dependencies
RUN npm install

# Expose API port to the outside
EXPOSE 3001

# Launch application
CMD ["npm","run", "dev"]
