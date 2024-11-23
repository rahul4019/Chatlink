# Build stage
FROM node:22-alpine as build

# environment variable
ENV BASE_URL=$VITE_BASE_URL

# add build argument 
ARG BASE_URL

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci

COPY . .

RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
