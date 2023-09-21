FROM node:lts-alpine

WORKDIR /app
COPY ["package.json", "package-lock.json*","tsconfig.json", "npm-shrinkwrap.json*", "./"]
RUN npm install -g typescript
RUN npm ci && npm cache clean --force
ENV NODE_ENV=production
ENV NODE_OPTIONS=--max_old_space_size=2048
COPY . .
EXPOSE 80
RUN npm run build
CMD ["npm","run","start"]
