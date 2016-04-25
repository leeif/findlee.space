start-pro: install
	NODE_ENV=production forever start app.js pro
	
start-dev: install-dev
	NODE_ENV=development node app.js

start-test: install-dev
	NODE_ENV=test node app.js

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