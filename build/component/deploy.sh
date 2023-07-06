#!/bin/bash

npm run build

cd ../deploy

pax -w -f plugin.pax ./plugin
pax_pid=$!

wait $pax_pid

cd ..

echo "Deploy build complete."
