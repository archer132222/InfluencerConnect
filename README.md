# InfluenceConnect

A platform connecting brands with influencers for marketing campaigns.

## Features

- User authentication (customers and influencers)
- Campaign creation and management
- Influencer profiles and discovery
- Campaign request system
- Messaging system
- Support ticket system

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Express.js, TypeScript
- **Database**: SQLite (better-sqlite3)
- **ORM**: Drizzle ORM
- **UI Components**: Radix UI

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd InfluenceConnect
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and update the `SESSION_SECRET` with a secure random string (you can generate one using: `openssl rand -base64 32`)

4. Initialize the database:
```bash
npm run db:push
```

This will create the SQLite database file at `./database.sqlite` (or the path specified in `DATABASE_PATH`).

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

To run only the client:
```bash
npm run dev:client
```

## Building for Production

Build the application:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Database

This project uses SQLite, which stores data in a local file (`database.sqlite` by default). The database file is automatically created when you run `npm run db:push`.

**Note**: The database file is included in `.gitignore` and will not be committed to version control. Each developer/environment should have their own database file.

## Environment Variables

- `DATABASE_PATH`: Path to SQLite database file (default: `./database.sqlite`)
- `SESSION_SECRET`: Secret key for session encryption (required in production)
- `PORT`: Server port (default: `5000`)
- `NODE_ENV`: Environment mode (`development` or `production`)

## Project Structure

```
InfluenceConnect/
├── client/          # Frontend React application
├── server/          # Backend Express server
├── shared/          # Shared types and schemas
├── script/          # Build scripts
└── migrations/      # Database migrations (generated)
```

## Deployment

### Deploy to Railway (Recommended - Free & Easy)

Railway is the easiest way to deploy this full-stack application for free:

1. **Push your code to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Go to [Railway.app](https://railway.app)** and sign up with GitHub

3. **Create a New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

4. **Set Environment Variables**:
   - Go to your project → Variables
   - Add: `SESSION_SECRET` (generate with: `openssl rand -base64 32`)
   - Add: `NODE_ENV=production`
   - Add: `DATABASE_PATH=/tmp/database.sqlite` (or leave default)

5. **Deploy**:
   - Railway will automatically detect the project and start building
   - Once deployed, you'll get a public URL like: `https://your-app.railway.app`

6. **Access your site**:
   - Your website will be live at the Railway URL
   - Share this URL with anyone!

### Alternative: Deploy to Render

1. Go to [render.com](https://render.com) and sign up
2. Create a new "Web Service"
3. Connect your GitHub repository
4. Set build command: `npm run build`
5. Set start command: `npm start`
6. Add environment variables (same as Railway)
7. Deploy!

### Environment Variables for Production

Make sure to set these in your hosting platform:
- `SESSION_SECRET`: A secure random string (required)
- `NODE_ENV`: `production`
- `PORT`: Usually set automatically by the platform
- `DATABASE_PATH`: Path to SQLite file (default: `./database.sqlite`)

## License

MIT

