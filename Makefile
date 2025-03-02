PYTHON := python3
PIP := pip3
NPM := npm

FLASK_SERVER_DIR := flask-server
CLIENT_DIR := client

.PHONY: setup-db start-flask start-react start-all install-requirements test

setup-db:
	cd $(FLASK_SERVER_DIR) && $(PYTHON) database.py

install-requirements:
	cd $(FLASK_SERVER_DIR) && $(PIP) install -r requirements.txt

test:
	cd $(FLASK_SERVER_DIR) && pytest

start-react:
	cd $(CLIENT_DIR) && $(NPM) start

start-flask:
	cd $(FLASK_SERVER_DIR) && $(PYTHON) server.py

start-all:
	make start-flask & make start-react