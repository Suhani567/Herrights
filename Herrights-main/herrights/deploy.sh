#!/bin/bash

echo "🚀 HerRights Deployment Script"
echo "=============================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if Python is installed
if ! command -v python &> /dev/null; then
    echo "❌ Python is not installed. Please install Python first."
    exit 1
fi

echo "✅ Dependencies check passed"

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd herrights-backend
pip install -r requirements.txt

if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

cd ..

# Build the frontend
echo "🔨 Building frontend..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Failed to build frontend"
    exit 1
fi

echo "✅ Build completed successfully!"
echo ""
echo "🌐 Deployment Options:"
echo "1. Vercel: Run 'vercel' in the project root"
echo "2. Netlify: Upload the 'dist' folder to Netlify"
echo "3. Manual: Serve the 'dist' folder with any static file server"
echo ""
echo "📝 Don't forget to:"
echo "- Set up environment variables in your hosting platform"
echo "- Configure CORS settings in Django for production"
echo "- Set up a production database"
echo "- Configure static file serving"
