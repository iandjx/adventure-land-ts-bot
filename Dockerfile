FROM node:alpine
COPY . . 
RUN yarn && yarn build
CMD ["yarn", "start"]