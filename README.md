# Ali Shoja Photography Portfolio

A professional photography portfolio built with Next.js 14, featuring Docker support and modern development tools.

## 🚀 Quick Start

### Using Makefile (Recommended)
```bash
# Show all available commands
make help

# Quick setup and run with Docker
make quick-start

# Quick setup for development
make quick-dev
```

### Manual Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Or use Docker
npm run docker:prod
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📋 Available Commands

### Make Commands

#### Development
- `make dev` - Start development server
- `make build` - Build for production
- `make start` - Start production server
- `make lint` - Run linter
- `make lint-fix` - Fix linter issues

#### Docker
- `make docker-build` - Build Docker image
- `make docker-dev` - Start Docker development
- `make docker-prod` - Start Docker production
- `make docker-up` - Start containers (detached)
- `make docker-down` - Stop and remove containers
- `make docker-logs` - Show container logs
- `make docker-shell` - Access container shell

#### Utilities
- `make status` - Show project status
- `make health` - Check application health
- `make check-env` - Verify environment file
- `make info` - Show project information

#### Cleanup
- `make docker-clean` - Clean Docker system
- `make docker-clean-project` - Clean project Docker resources

### NPM Scripts
```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Docker
npm run docker:build    # Build Docker image
npm run docker:run      # Run Docker container
npm run docker:dev      # Docker development
npm run docker:prod     # Docker production
npm run docker:stop     # Stop Docker containers
npm run docker:clean    # Clean Docker system
```

## 🐳 Docker

This project includes full Docker support with multi-stage builds and optimization.

### Docker Files
- `Dockerfile` - Multi-stage production build
- `docker-compose.yml` - Production configuration
- `docker-compose.dev.yml` - Development configuration
- `.dockerignore` - Files to exclude from Docker context

### Docker Commands
```bash
# Production (recommended)
make docker-prod

# Development with hot reload
make docker-dev

# Build only
make docker-build

# Stop containers
make docker-down
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: MongoDB
- **Image Optimization**: Plaiceholder
- **Animation**: Framer Motion & React Spring
- **State Management**: Zustand
- **Email**: Nodemailer
- **Containerization**: Docker & Docker Compose

## 📁 Project Structure

```
alishoja-photography-portfolio/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API routes
│   │   ├── gallery/        # Gallery pages
│   │   ├── login/          # Authentication
│   │   └── ...
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   ├── layout/        # Layout components
│   │   └── ...
│   └── styles/            # Global styles
├── public/                # Static assets
├── lib/                   # Utility libraries
├── hooks/                 # Custom React hooks
├── utils/                 # Utility functions
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose production
├── docker-compose.dev.yml # Docker Compose development
├── Makefile              # Make commands
└── .env.local            # Environment variables
```

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
# MongoDB Configuration
MONGODB_URI=your_mongodb_connection_string

# Email Configuration (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_APP_PASSWORD=your_app_password

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# JWT Configuration
JWT_SECRET=your_jwt_secret
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Docker Production
```bash
# Build and run production container
make docker-prod

# Or manually
docker-compose up --build
```

## 🧪 Development

### Local Development
```bash
# Install dependencies
make install

# Start development server
make dev

# With Docker (recommended)
make docker-dev
```

### Project Setup
```bash
# Full setup with environment check
make setup

# Docker setup
make setup-docker
```

## 📊 Monitoring

### Health Check
```bash
# Check application health
make health

# View container logs
make docker-logs

# Check project status
make status
```

### Performance
- Next.js built-in analytics
- Image optimization with Plaiceholder
- Docker multi-stage builds for smaller images
- Static asset caching

## 🔐 Security

### Environment Security
- Environment variables are excluded from Docker builds
- Secrets are loaded at runtime
- MongoDB connection uses authentication

### Authentication
- NextAuth.js with Google OAuth
- JWT token management
- Session-based authentication

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
make docker-down
# or
lsof -ti:3000 | xargs kill -9
```

**Environment variables not loaded:**
```bash
make check-env
```

**Docker build issues:**
```bash
make docker-clean
make docker-build
```

**Container access:**
```bash
make docker-shell
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with `make deploy-check`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Docker](https://www.docker.com/) - Containerization platform

---

**Ali Shoja Photography Portfolio** - Capturing moments, creating memories.
