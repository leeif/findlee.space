start: install install-database
	node app.js pro
	
start-dev: install install-database
	node app.js dev

install:
	npm install
	bower install

install-database:
	node application/InstallDatabase.js

