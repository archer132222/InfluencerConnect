# Deployment Guide

This guide will help you deploy InfluenceConnect so anyone can access it via a public URL.

## Quick Deploy to Railway (Recommended)

Railway is the easiest and fastest way to deploy this app for free.

### Step 1: Push to GitHub

If you haven't already, push your code to GitHub:

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy on Railway

1. **Sign up**: Go to [railway.app](https://railway.app) and sign up with your GitHub account

2. **Create Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `InfluenceConnect` repository
   - Railway will automatically detect it's a Node.js project

3. **Configure Environment Variables**:
   - Go to your project → Variables tab
   - Add these variables:
     ```
     SESSION_SECRET=your-secret-key-here
     NODE_ENV=production
     ```
   - Generate a secure SESSION_SECRET:
     - On Mac/Linux: `openssl rand -base64 32`
     - On Windows: Use an online generator or PowerShell: `[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))`

4. **Deploy**:
   - Railway will automatically start building and deploying
   - Wait for the build to complete (usually 2-3 minutes)
   - Once done, you'll see a "Deployments" section with a URL

5. **Get Your Public URL**:
   - Click on your deployment
   - Go to "Settings" → "Domains"
   - Railway provides a free domain like: `your-app.railway.app`
   - Or you can add a custom domain

6. **Done!** 🎉
   - Your website is now live and accessible to anyone
   - Share the URL with others!

## Alternative: Deploy to Render

1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: InfluenceConnect
   - **Environment**: Node
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free
5. Add Environment Variables:
   - `SESSION_SECRET`: (generate a secure random string)
   - `NODE_ENV`: `production`
6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. Get your public URL from Render dashboard

## Important Notes

- **Database**: SQLite works on Railway and Render, but data is stored in the file system. For production with many users, consider migrating to PostgreSQL later.
- **Free Tier Limits**: 
  - Railway: 500 hours/month free
  - Render: Free tier with some limitations
- **Custom Domain**: Both platforms allow you to add your own domain name for free

## Troubleshooting

### Build Fails
- Make sure all dependencies are in `package.json`
- Check that `npm run build` works locally first
- Review the build logs in Railway/Render dashboard

### App Crashes
- Check environment variables are set correctly
- Ensure `SESSION_SECRET` is set
- Review server logs in the platform dashboard

### Database Issues
- The database file is created automatically on first run
- On Railway/Render, the database persists in the file system
- For production, consider using a managed database service

## Need Help?

- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs

