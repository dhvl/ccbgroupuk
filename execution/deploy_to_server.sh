#!/bin/bash

# Deployment script for InvestorBabu
SERVER="160.250.204.141"
USER="root" 
DEST_DIR="/home/investo/public_html"

echo "🚀 Starting Deployment to $SERVER..."

# 1. Ensure build is fresh
npm run build

# 2. Sync files to server
echo "📦 Syncing files to $DEST_DIR..."
rsync -avz --progress \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude '.next/cache' \
  . $USER@$SERVER:$DEST_DIR

echo "✅ Files synced successfully."
echo ""
echo "📝 Next steps on the server:"
echo "1. ssh $USER@$SERVER"
echo "2. cd $DEST_DIR"
echo "3. npm install --production"
echo "4. pm2 restart investorbabu || pm2 start npm --name 'investorbabu' -- start"
