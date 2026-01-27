FROM node:18-alpine

WORKDIR /app

# Install Angular CLI globally (tooling)
RUN npm install -g @angular/cli

EXPOSE 4200
