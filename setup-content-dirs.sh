#!/bin/bash

# Content Directory Setup Script
# This script creates the necessary directory structure for lesson content

echo "================================"
echo "Setting up Content Directories"
echo "================================"

# Define instructors and levels
INSTRUCTORS=("ash" "adarsh" "jean-mastan")
LEVELS=("beginner" "intermediate" "advanced")

# Create content root directory
mkdir -p content

# Create directories for each instructor and level
for instructor in "${INSTRUCTORS[@]}"; do
  for level in "${LEVELS[@]}"; do
    dir="content/$instructor/$level"
    mkdir -p "$dir"
    echo "✓ Created: $dir"
  done
done

echo ""
echo "================================"
echo "Directory Structure Created!"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Add your lesson JSON files to the appropriate directories"
echo "2. Example: content/ash/beginner/lesson-1.json"
echo "3. Use EXAMPLE_LESSON.json as a template"
echo "4. Restart the dev server: npm run dev"
echo ""
echo "Structure:"
echo "content/"
for instructor in "${INSTRUCTORS[@]}"; do
  echo "├── $instructor/"
  for level in "${LEVELS[@]}"; do
    echo "│   ├── $level/ (add lesson-*.json files here)"
  done
done
