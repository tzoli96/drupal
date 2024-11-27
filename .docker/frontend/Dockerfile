FROM node:18

WORKDIR /usr/src/app

COPY ./frontend/package*.json ./
RUN npm install

COPY ./frontend ./
COPY .docker/frontend/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["npm", "run", "dev"]
