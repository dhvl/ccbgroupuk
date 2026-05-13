# Directive: Deployment to Production

## Target
**Server**: `160.250.204.141`
**User**: `apple` (assuming user based on local paths, or `root`)
**Path**: `/var/www/investorbabu` (standard) or home directory.

## 1. Build Process
Run `npm run build` locally to generate the `.next` and `public` directories.

## 2. Packaging
Compress the necessary files for transfer:
- `.next/`
- `public/`
- `package.json`
- `package-lock.json`
- `.env` (ensure keys are present)

## 3. Transfer
**Tool**: `execution/deploy_to_server.sh`
**Command**: `scp -r .next public package.json apple@160.250.204.141:/path/to/deploy`

## 4. Server-Side Setup
1. SSH into the server.
2. Run `npm install --production`.
3. Start the app using `pm2 start npm --name "investorbabu" -- start`.
