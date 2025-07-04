#!/bin/bash
set -e # Exit immediately if any command fails

echo "Installing root dependencies..."
npm install

echo "Building backend..."
cd backend
npm install
npm run build
cd ..

echo "Building frontend..."
cd frontend
npm install
npm run build
cd ..

echo "Building admin panel..."
cd admin
npm install
npm run build
cd ..

echo "Build completed successfully!"