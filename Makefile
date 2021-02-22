clean:
	rm -rf .next \
	node_modules \
	out \
	package-lock.json \
	yarn.lock

install: clean
	yarn install

build: install
	yarn build

serve: build
	yarn start

dev: install
	yarn dev
