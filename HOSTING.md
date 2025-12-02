# Hosting Instructions

This guide will help you deploy the Developer Directory App to free hosting platforms.

## Hosting Options

### Option 1: Vercel (Recommended - Easiest)

#### Frontend (Vercel)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up/login
3. Click "New Project"
4. Import your GitHub repository
5. Set root directory to `frontend`
6. Build command: `npm run build`
7. Output directory: `dist`
8. Add environment variable: `VITE_API_URL` = your backend URL
9. Deploy!

#### Backend (Vercel Serverless)
1. Create `vercel.json` in backend folder:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```
2. Deploy backend to Vercel
3. Update frontend `VITE_API_URL` to backend URL

### Option 2: Netlify (Frontend) + Railway (Backend)

#### Frontend (Netlify)
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect GitHub repository
5. Build settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`
6. Add environment variable: `VITE_API_URL`
7. Deploy!

#### Backend (Railway)
1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select your repository
4. Root directory: `backend`
5. Start command: `npm start`
6. Add environment variable: `PORT` (auto-assigned)
7. Get your backend URL
8. Update frontend environment variable

### Option 3: Render (Both Frontend & Backend)

#### Backend (Render)
1. Go to [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub repository
4. Settings:
   - Name: `developer-directory-backend`
   - Root Directory: `backend`
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variable: `PORT` = 5000
6. Deploy and get URL

#### Frontend (Render)
1. New → Static Site
2. Connect GitHub repository
3. Settings:
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Publish Directory: `dist`
4. Add environment variable: `VITE_API_URL` = backend URL
5. Deploy!

## Quick Setup Steps

### 1. Prepare for Hosting

Update `frontend/src/services/api.js` to use environment variable:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
```

### 2. Update Backend CORS (if needed)

In `backend/server.js`, update CORS to allow your frontend domain:
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend-domain.vercel.app'],
  credentials: true
}));
```

### 3. Environment Variables

**Frontend:**
- `VITE_API_URL`: Your backend API URL

**Backend:**
- `PORT`: Port number (usually auto-assigned)

### 4. Build Commands

**Frontend:**
```bash
cd frontend
npm install
npm run build
```

**Backend:**
```bash
cd backend
npm install
npm start
```

## Recommended: Vercel (Easiest Setup)

### Step-by-Step Vercel Deployment

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Deploy Backend:**
```bash
cd backend
vercel
# Follow prompts
# Set root directory: backend
```

3. **Deploy Frontend:**
```bash
cd frontend
vercel
# Follow prompts
# Set root directory: frontend
# Add environment variable: VITE_API_URL = your backend URL
```

4. **Get Your URLs:**
- Backend: `https://your-backend.vercel.app`
- Frontend: `https://your-frontend.vercel.app`

5. **Update Frontend Environment Variable:**
- Go to Vercel dashboard
- Select frontend project
- Settings → Environment Variables
- Add: `VITE_API_URL` = `https://your-backend.vercel.app`
- Redeploy

## Testing After Deployment

1. Visit your frontend URL
2. Try adding a developer
3. Check if data persists
4. Test search and filter
5. Verify toast notifications

## Troubleshooting

### CORS Errors
- Update backend CORS to include frontend domain
- Check environment variables

### API Not Working
- Verify `VITE_API_URL` is set correctly
- Check backend logs
- Ensure backend is running

### Build Failures
- Check Node.js version (should be 16+)
- Verify all dependencies are in package.json
- Check build logs for errors

## Free Hosting Platforms Summary

| Platform | Frontend | Backend | Free Tier |
|----------|----------|---------|-----------|
| Vercel | ✅ | ✅ | Yes |
| Netlify | ✅ | ❌ | Yes |
| Railway | ❌ | ✅ | Yes (with credit card) |
| Render | ✅ | ✅ | Yes |
| Heroku | ❌ | ✅ | No (paid only) |

## Recommended Setup

**Best for Free:**
- Frontend: Vercel or Netlify
- Backend: Railway or Render

**Easiest Setup:**
- Both on Vercel (serverless functions)

## After Hosting

Once deployed, share:
1. Frontend URL
2. Backend URL (if separate)
3. Screenshots
4. Contact details
5. Joining date availability

Send to: **intern@talrn.com**

