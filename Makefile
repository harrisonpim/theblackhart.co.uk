process-images:
	bash build/process-images

build: process-images
	bundle exec jekyll build

serve:
	bundle exec jekyll serve

.PHONY: build process-images
