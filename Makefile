clean:
	rm -rf .next node_modules

install: clean
	yarn install

build: install
	yarn export

serve: build
	yarn start

dev: install
	yarn dev
