start-pro: install
	forever start app.js pro
	
start-dev: install-dev
	node app.js dev

install:
	npm install --producation
	bower install

install-dev:
	npm install
	bower install

migration-test:
	node_modules/.bin/sequelize db:migrate --env test

.PHONY: test

test:
	# NODE_ENV=test node ./test/modelsWrapperTest.js
	NODE_ENV=test node ./test/managerTest.js