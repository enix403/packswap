#!/usr/bin/env bash

CONTAINER_NAME=packswap_pg

docker container stop $CONTAINER_NAME
docker container rm $CONTAINER_NAME

docker run -d \
  --rm -it \
  --name $CONTAINER_NAME \
  -v ./postgres-data:/var/lib/postgresql/data \
  -p 5432:5432 \
  -e POSTGRES_USER=user1 \
  -e POSTGRES_PASSWORD=user1 \
  -e POSTGRES_DB=user1 \
  postgres:latest
