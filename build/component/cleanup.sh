#!/bin/bash

cd ../deploy

cp ./plugin/README.md ./

rm -rf ./plugin

echo "Cleanup complete. Ready to publish."

npm publish
