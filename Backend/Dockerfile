FROM node:lts-alpine

WORKDIR /app
COPY ["package.json", "package-lock.json*","tsconfig.json", "npm-shrinkwrap.json*", "./"]
RUN npm install -g typescript
RUN npm ci && npm cache clean --force
ENV NODE_ENV=production
ENV NODE_OPTIONS=--max_old_space_size=1024
COPY . .
EXPOSE 80
CMD ["npm","run","start"]
