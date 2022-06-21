FROM node:latest
ENV MONGO_DB_USERNAME = WebIT \
    MONGO_DB_PWD = AyjApuMSrWMeXh0L
RUN mkdir -p /home/app
COPY . /home/app
CMD ["node", "/home/app/app.js"]

