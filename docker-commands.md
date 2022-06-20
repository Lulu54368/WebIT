# commands
## create docker network
sudo docker network create mongo-network
## start mongodb
sudo docker run --name mongodb \
--net mongo-network -d \
-e MONGO_INITDB_ROOT_USERNAME=WebIT \
-e MONGO_INITDB_ROOT_PASSWORD=AyjApuMSrWMeXh0L  \
mongo
## start mongo-express
sudo docker run -it --rm \
--name mongo-express \
--net mongo-network \
-d \
-p 8081:8081 \
-e ME_CONFIG_MONGODB_ADMINUSERNAME=WebIT \
-e ME_CONFIG_MONGODB_ADMINPASSWORD=AyjApuMSrWMeXh0L \
-e ME_CONFIG_MONGODB_SERVER=mongodb \
mongo-express
