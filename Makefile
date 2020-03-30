VERSION=0.0.1
TAG ?= $(shell git log -1 --format=%h)
CURRENTDIR ?= $(shell pwd)

APP_VERSION = v.$(VERSION).${TAG}
APP_NAME = force-Covid19-frontend
ORGANISATION_NAME = beopenit


IMAGE_NAME = ${ORGANISATION_NAME}/${APP_NAME}
IMAGE_VERSION = ${IMAGE_NAME}:${APP_VERSION}

build_image:
	@echo "Build docker image"
	docker build --no-cache -t ${IMAGE_VERSION} -f Dockerfile .
	docker tag ${IMAGE_VERSION} ${IMAGE_NAME}:latest

push_image:
	@echo "Push docker image"
	docker push ${IMAGE_VERSION}
	docker push ${IMAGE_NAME}:latest
	docker rmi -f ${IMAGE_VERSION} || true
	docker rmi -f ${IMAGE_NAME}:latest || true
	docker rmi -f $(docker images -q --filter "dangling=true") || true
