# Small, production-friendly Node base image.
FROM node:20-alpine

# All following commands run from /app inside the container.
WORKDIR /app

# Copy ONLY the package files first, then install.
# Docker caches this layer, so npm install re-runs only when deps change,
# not every time you edit server.js.
COPY package*.json ./
RUN npm install

# Now copy the rest of the source code.
COPY . .

# Document the port the app listens on (App Runner default).
EXPOSE 8080

# Start the server.
CMD ["node", "server.js"]
