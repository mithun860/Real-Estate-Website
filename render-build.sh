#!/bin/bash
set -e # Exit immediately on error

echo "=== INSTALLING ROOT DEPENDENCIES ==="
npm install

echo "=== BUILDING BACKEND ==="
cd backend
npm install --production=false # Include devDependencies
npm run build
cd ..

echo "=== BUILDING FRONTEND ==="
cd frontend
npm install --production=false # Critical - installs Vite
npm run build
cd ..

echo "=== BUILDING ADMIN PANEL ==="
cd admin
npm install --production=false
npm run build
cd ..

echo "=== BUILD COMPLETED SUCCESSFULLY ==="