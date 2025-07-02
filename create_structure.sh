#!/bin/bash

# Create folder structure for Quranic Website
# بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ

echo "Creating folder structure for Quranic Website..."

# Create main directories
mkdir -p assets/css
mkdir -p assets/js
mkdir -p assets/images
mkdir -p assets/fonts
mkdir -p assets/audio

echo "Created directories:"
echo "  ✓ assets/css"
echo "  ✓ assets/js" 
echo "  ✓ assets/images"
echo "  ✓ assets/fonts"
echo "  ✓ assets/audio"

# Create placeholder files
touch assets/images/.gitkeep
touch assets/fonts/.gitkeep
touch assets/audio/.gitkeep

echo ""
echo "Folder structure created successfully!"
echo ""
echo "File structure:"
echo "├── index.html"
echo "├── README.md"
echo "├── create_structure.sh"
echo "└── assets/"
echo "    ├── css/"
echo "    │   ├── styles.css"
echo "    │   ├── responsive.css"
echo "    │   └── animations.css"
echo "    ├── js/"
echo "    │   ├── config.js"
echo "    │   ├── api.js"
echo "    │   └── main.js"
echo "    ├── images/"
echo "    ├── fonts/"
echo "    └── audio/"
echo ""
echo "Ready to upload to cPanel hosting!"
echo ""
echo "Instructions:"
echo "1. Upload all files to your web hosting"
echo "2. Extract to public_html folder"
echo "3. Visit your website URL"
echo "4. Enjoy your beautiful Quranic website!"
echo ""
echo "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ"