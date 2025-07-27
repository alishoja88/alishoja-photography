# 🐳 Docker Guide for Ali Shoja Photography Portfolio

## 📋 Prerequisites

- Docker installed on your system
- Docker Compose installed
- Environment variables configured in `.env.local`

## 🚀 Quick Start

### Development Mode
```bash
# Start development environment
npm run docker:dev

# Or manually
docker-compose -f docker-compose.dev.yml up --build
```

### Production Mode
```bash
# Start production environment
npm run docker:prod

# Or manually
docker-compose up --build
```

## 🛠️ Available Commands

### Build Docker Image
```bash
npm run docker:build
```

### Run Container
```bash
npm run docker:run
```

### Stop Containers
```bash
npm run docker:stop
```

### Clean Docker System
```bash
npm run docker:clean
```

## 📁 File Structure

```
├── Dockerfile              # Main Docker configuration
├── .dockerignore          # Files to exclude from Docker build
├── docker-compose.yml     # Production Docker Compose
├── docker-compose.dev.yml # Development Docker Compose
└── .env.local            # Environment variables
```

## 🔧 Configuration

### Environment Variables
Make sure your `.env.local` file contains all required variables:

```bash
# MongoDB Configuration
MONGODB_URI=mongodb+srv://...

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-app-password

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret

# Google OAuth
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret

# JWT Configuration
JWT_SECRET=your-jwt-secret
```

## 🌐 Access

- **Development**: http://localhost:3000
- **Production**: http://localhost:3000

## 📊 Monitoring

### View Logs
```bash
# Development logs
docker-compose -f docker-compose.dev.yml logs -f

# Production logs
docker-compose logs -f
```

### Container Status
```bash
docker ps
```

## 🔍 Troubleshooting

### Port Already in Use
If port 3000 is already in use:
```bash
# Stop existing containers
docker-compose down

# Or kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Build Issues
```bash
# Clean build cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache
```

### Environment Variables
Make sure `.env.local` exists and contains all required variables.

## 🚀 Deployment

### Local Production
```bash
npm run docker:prod
```

### Cloud Deployment
The Docker setup is compatible with:
- AWS ECS
- Google Cloud Run
- Azure Container Instances
- DigitalOcean App Platform
- Heroku Container Registry

## 📝 Notes

- Development mode includes hot reload
- Production mode is optimized for performance
- All environment variables are passed to containers
- MongoDB Atlas is used (no local MongoDB needed) 