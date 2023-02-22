# FROM node:18-alpine as builder
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# FROM node:18-alpine as prod
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install
# COPY --from=builder /usr/src/app/dist ./dist
# EXPOSE 5005
# CMD ["node", "dist/index"]


FROM node:18-alpine as Builder
# RUN npm install -g @nestjs/cli
COPY . /app/
RUN cd /app && npm install && npm run build
# ENTRYPOINT ["tail", "-f", "/dev/null"]
FROM node:18-alpine as Production
WORKDIR /app
COPY --from=Builder /app/dist ./dist
COPY --from=Builder /app/node_modules ./node_modules
CMD node ./dist/index