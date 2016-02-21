start: install install-database
	forever start app.js pro
	
start-dev: install-dev install-database
	node app.js dev

install:
	npm install --producation
	bower install

install-dev:
	npm install
	bower install

install-database:
	node application/InstallDatabase.js

