FROM node:18-alpine as builder
WORKDIR /usr/src/app
COPY . .
COPY package*.json /usr/src/app
RUN npm install
RUN npm run build
# RUN npm install -g serve
# CMD serve -s build -l 3000

FROM nginx:1.22-alpine as prod
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
