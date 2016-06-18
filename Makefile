run-pro: install
	NODE_ENV=production forever start app.js pro
	
run-dev: install-dev
	NODE_ENV=development node app.js

run-test: install-dev
	NODE_ENV=test node app.js

install:
	npm install --producation
	bower install

install-dev:
	npm install
	bower install

stop-pro:
	forever stop app.js

migration-pro:
	node_modules/.bin/sequelize db:migrate --env production --config config/mysql.js

migration-dev:
	node_modules/.bin/sequelize db:migrate --env development --config config/mysql.js
	
migration-test:
	node_modules/.bin/sequelize db:migrate --env test --config config/mysql.js

.PHONY: test

test:
	# NODE_ENV=test node ./test/modelsWrapperTest.js
	NODE_ENV=test node ./test/managerTest.js