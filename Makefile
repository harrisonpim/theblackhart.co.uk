clean:
	rm -rf .next node_modules

install: clean
	yarn install

build: install
	yarn build

serve: build
	yarn start

dev: install
	yarn dev
