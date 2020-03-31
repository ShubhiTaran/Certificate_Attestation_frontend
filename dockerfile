# Stage 1 - the build process
FROM node:8 as build-deps
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app

# COPY package.json package.lock ./

RUN npm install
COPY . /app

RUN ng build

# Stage 2 - the production environment
FROM nginx:1.12-alpine
COPY --from=build-deps /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]