install:
	npm install && cd ./frontend/ && npm install

start:
	npx start-server -s ./frontend/dist

build:
	cd ./frontend/ && npm run build
