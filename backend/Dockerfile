# Use Python 3.13 slim image
FROM python:3.13-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install uv for faster Python package installation
RUN pip install uv

# Copy dependency files
COPY pyproject.toml uv.lock ./

# Install Python dependencies
RUN uv pip install --system --no-cache -r pyproject.toml

# Copy application code
COPY . .

# Create directory for database
RUN mkdir -p /app/data

# Expose port (Railway will set PORT env variable)
EXPOSE 8000

# Run the application - use PORT env var from Railway, default to 8000
CMD uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}