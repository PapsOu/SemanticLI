#!/bin/sh

# Clone Semantic UI
cd ./semantic-ui
git clone --depth=1 https://github.com/Semantic-Org/Semantic-UI.git .
cd ..

echo "Semantic UI successfully cloned into project"

# init npm packages
npm install && npm install gulp
