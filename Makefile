# Ali Shoja Photography Portfolio - Makefile
# Usage: make <command>

# Variables
PROJECT_NAME = alishoja-photography
DOCKER_IMAGE = $(PROJECT_NAME)
DOCKER_CONTAINER = $(PROJECT_NAME)-app-1
DOCKER_NETWORK = $(PROJECT_NAME)_app-network
PORT = 3000
ENV_FILE = .env.local

# Colors for output
RED = \033[0;31m
GREEN = \033[0;32m
YELLOW = \033[1;33m
BLUE = \033[0;34m
PURPLE = \033[0;35m
CYAN = \033[0;36m
NC = \033[0m # No Color

# Default target
.DEFAULT_GOAL := help

# Help command
.PHONY: help
help: ## Show this help message
	@echo "$(CYAN)Ali Shoja Photography Portfolio - Available Commands$(NC)"
	@echo "$(YELLOW)=================================================$(NC)"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "$(GREEN)%-20s$(NC) %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# Development Commands
.PHONY: install
install: ## Install dependencies
	@echo "$(BLUE)Installing dependencies...$(NC)"
	npm install

.PHONY: dev
dev: ## Start development server
	@echo "$(BLUE)Starting development server...$(NC)"
	npm run dev

.PHONY: build
build: ## Build the application for production
	@echo "$(BLUE)Building application...$(NC)"
	npm run build

.PHONY: start
start: ## Start production server
	@echo "$(BLUE)Starting production server...$(NC)"
	npm start

.PHONY: lint
lint: ## Run linter
	@echo "$(BLUE)Running linter...$(NC)"
	npm run lint

.PHONY: lint-fix
lint-fix: ## Fix linter issues
	@echo "$(BLUE)Fixing linter issues...$(NC)"
	npm run lint -- --fix

# Docker Commands
.PHONY: docker-build
docker-build: ## Build Docker image
	@echo "$(PURPLE)Building Docker image...$(NC)"
	docker build -t $(DOCKER_IMAGE) .

.PHONY: docker-run
docker-run: ## Run Docker container (single container)
	@echo "$(PURPLE)Running Docker container...$(NC)"
	docker run -p $(PORT):$(PORT) --env-file $(ENV_FILE) --name $(PROJECT_NAME)-single $(DOCKER_IMAGE)

.PHONY: docker-dev
docker-dev: ## Start Docker development environment
	@echo "$(PURPLE)Starting Docker development environment...$(NC)"
	docker-compose -f docker-compose.dev.yml up --build

.PHONY: docker-prod
docker-prod: ## Start Docker production environment
	@echo "$(PURPLE)Starting Docker production environment...$(NC)"
	docker-compose up --build

.PHONY: docker-up
docker-up: ## Start Docker containers (production)
	@echo "$(PURPLE)Starting Docker containers...$(NC)"
	docker-compose up -d

.PHONY: docker-down
docker-down: ## Stop and remove Docker containers
	@echo "$(PURPLE)Stopping Docker containers...$(NC)"
	docker-compose down

.PHONY: docker-stop
docker-stop: ## Stop Docker containers
	@echo "$(PURPLE)Stopping Docker containers...$(NC)"
	docker-compose stop

.PHONY: docker-restart
docker-restart: docker-stop docker-up ## Restart Docker containers

.PHONY: docker-logs
docker-logs: ## Show Docker container logs
	@echo "$(PURPLE)Showing Docker logs...$(NC)"
	docker-compose logs -f

.PHONY: docker-shell
docker-shell: ## Access Docker container shell
	@echo "$(PURPLE)Accessing container shell...$(NC)"
	docker exec -it $(DOCKER_CONTAINER) /bin/sh

# Docker Cleanup Commands
.PHONY: docker-clean
docker-clean: ## Clean Docker system (containers, images, networks)
	@echo "$(RED)Cleaning Docker system...$(NC)"
	docker system prune -f

.PHONY: docker-clean-all
docker-clean-all: ## Clean all Docker data (WARNING: removes all containers, images, volumes)
	@echo "$(RED)WARNING: This will remove ALL Docker data!$(NC)"
	@read -p "Are you sure? (y/N): " confirm && [ "$$confirm" = "y" ]
	docker system prune -a --volumes -f

.PHONY: docker-clean-project
docker-clean-project: ## Clean only project Docker resources
	@echo "$(RED)Cleaning project Docker resources...$(NC)"
	-docker container rm -f $(DOCKER_CONTAINER)
	-docker image rm -f $(DOCKER_IMAGE)
	-docker network rm $(DOCKER_NETWORK)

# Status and Information Commands
.PHONY: status
status: ## Show project status (containers, images, networks)
	@echo "$(CYAN)Project Status$(NC)"
	@echo "$(YELLOW)==============$(NC)"
	@echo "$(GREEN)Docker Containers:$(NC)"
	@docker ps --filter "name=$(PROJECT_NAME)" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" || echo "No containers running"
	@echo ""
	@echo "$(GREEN)Docker Images:$(NC)"
	@docker images --filter "reference=$(DOCKER_IMAGE)" --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}\t{{.CreatedAt}}" || echo "No images found"
	@echo ""
	@echo "$(GREEN)Docker Networks:$(NC)"
	@docker network ls --filter "name=$(PROJECT_NAME)" --format "table {{.Name}}\t{{.Driver}}\t{{.Scope}}" || echo "No networks found"

.PHONY: check-env
check-env: ## Check if environment file exists
	@if [ -f $(ENV_FILE) ]; then \
		echo "$(GREEN)Environment file $(ENV_FILE) exists$(NC)"; \
	else \
		echo "$(RED)Environment file $(ENV_FILE) not found!$(NC)"; \
		echo "$(YELLOW)Please create $(ENV_FILE) with required environment variables$(NC)"; \
		exit 1; \
	fi

.PHONY: health
health: ## Check application health
	@echo "$(BLUE)Checking application health...$(NC)"
	@curl -s -o /dev/null -w "HTTP Status: %{http_code}\nResponse Time: %{time_total}s\n" http://localhost:$(PORT) || echo "$(RED)Application is not accessible$(NC)"

# Git Commands
.PHONY: git-status
git-status: ## Show git status
	@echo "$(CYAN)Git Status$(NC)"
	@git status --short

.PHONY: git-clean
git-clean: ## Clean git repository (untracked files)
	@echo "$(YELLOW)Cleaning untracked files...$(NC)"
	git clean -fd

# Project Setup Commands
.PHONY: setup
setup: check-env install ## Setup project (install dependencies and check environment)
	@echo "$(GREEN)Project setup completed!$(NC)"

.PHONY: setup-docker
setup-docker: check-env docker-build ## Setup Docker environment
	@echo "$(GREEN)Docker setup completed!$(NC)"

# Database Commands (if needed)
.PHONY: db-connect
db-connect: ## Connect to MongoDB (requires container to be running)
	@echo "$(BLUE)Connecting to MongoDB...$(NC)"
	@echo "MongoDB URI from env: $$(grep MONGODB_URI $(ENV_FILE) | cut -d '=' -f2)"

# Backup Commands
.PHONY: backup-env
backup-env: ## Create backup of environment file
	@echo "$(BLUE)Creating environment backup...$(NC)"
	cp $(ENV_FILE) $(ENV_FILE).backup.$(shell date +%Y%m%d_%H%M%S)
	@echo "$(GREEN)Backup created!$(NC)"

# Maintenance Commands
.PHONY: update-deps
update-deps: ## Update all dependencies
	@echo "$(BLUE)Updating dependencies...$(NC)"
	npm update
	npm audit fix

.PHONY: security-check
security-check: ## Run security audit
	@echo "$(BLUE)Running security audit...$(NC)"
	npm audit

# Quick Start Commands
.PHONY: quick-start
quick-start: setup docker-prod ## Quick start: setup and run with Docker
	@echo "$(GREEN)Application is running at http://localhost:$(PORT)$(NC)"

.PHONY: quick-dev
quick-dev: setup dev ## Quick start: setup and run development server

# Test Commands (for future use)
.PHONY: test
test: ## Run tests (when implemented)
	@echo "$(YELLOW)Tests not implemented yet$(NC)"

.PHONY: test-watch
test-watch: ## Run tests in watch mode (when implemented)
	@echo "$(YELLOW)Tests not implemented yet$(NC)"

# Production Deploy Commands
.PHONY: deploy-check
deploy-check: lint build ## Check if ready for deployment
	@echo "$(GREEN)Deployment check passed!$(NC)"

.PHONY: info
info: ## Show project information
	@echo "$(CYAN)Ali Shoja Photography Portfolio$(NC)"
	@echo "$(YELLOW)=============================$(NC)"
	@echo "Project: $(PROJECT_NAME)"
	@echo "Port: $(PORT)"
	@echo "Environment: $(ENV_FILE)"
	@echo "Docker Image: $(DOCKER_IMAGE)"
	@echo "Docker Container: $(DOCKER_CONTAINER)"
	@echo ""
	@echo "$(GREEN)Quick Commands:$(NC)"
	@echo "  make quick-start  - Setup and run with Docker"
	@echo "  make quick-dev    - Setup and run development"
	@echo "  make status       - Show current status"
	@echo "  make help         - Show all commands" 