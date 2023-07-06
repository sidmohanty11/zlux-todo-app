#!/bin/bash
exclude_folder="webClient"
dest_folder="deploy"

cd ../../webClient
echo "Building webClient..."
npm install
npm run build
echo "Web build complete."

cd ..

echo "Copying files to deploy folder..."
mkdir -p ./build/$dest_folder
mkdir -p ./build/$dest_folder/plugin
rsync -av --exclude="$exclude_folder" . ./build/$dest_folder/plugin
cp ./build/component/package.json ./build/$dest_folder

echo "Build complete."
