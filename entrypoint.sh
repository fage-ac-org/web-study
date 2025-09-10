#!/bin/bash

app_env=${1:-development}

# Development environment commands
dev_commands() {
    echo "Running development environment commands..."
    NODE_ENV=development npm run dev
}

# Production environment commands
# ※Compiled before release
prod_commands() {
    echo "Running production environment commands..."
    NODE_ENV=production npm run dev
}

# Check environment variables to determine the running environment
if [ "$app_env" = "production" ] || [ "$app_env" = "prod" ] ; then
    echo "Production environment detected"
    prod_commands
else
    echo "Development environment detected"
    dev_commands
fi
