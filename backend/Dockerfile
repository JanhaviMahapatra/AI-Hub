# Use Node
FROM node:20

# Set working dir
WORKDIR /app

# Copy files
COPY package*.json ./

# Install deps
RUN npm install

# Copy rest
COPY . .

# Expose port
EXPOSE 5000

# Run app
CMD ["npm", "run", "dev"]