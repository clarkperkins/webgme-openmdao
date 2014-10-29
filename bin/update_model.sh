#!/bin/bash

cd ..

# Move the new model (OSX specific)
rm OpenMDAO_master.json
mv ~/Downloads/OpenMDAO_master.json .

unzip ~/Downloads/pluginFiles.zip
rm src/plugins/OpenMDAO/OpenMDAO/meta.js
mv ~/Downloads/pluginFiles/src/plugins/OpenMDAO/OpenMDAO/meta.js src/plugins/OpenMDAO/OpenMDAO/

