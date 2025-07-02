#!/bin/bash

# Git Setup Script for Quran Website
# بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ

echo "🌙 Setting up Git repository for Quran Website..."
echo "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    echo "Visit: https://git-scm.com/downloads"
    exit 1
fi

echo "✅ Git is installed."

# Initialize git repository
echo "📦 Initializing Git repository..."
git init

# Add all files
echo "📁 Adding all files to Git..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: Complete Quran website with modern UI

✨ Features:
- Complete Quran with 114 Surahs
- Persian translations (Fooladvand, Makarem, Ansarian)
- Online audio recitation
- Advanced search functionality
- Favorites system
- Modern responsive UI
- Dark/Light theme
- Mobile optimized
- cPanel ready

🎨 Technologies:
- HTML5, CSS3, JavaScript ES6+
- Responsive design
- Modern animations
- API integrations
- Local storage

بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ"

echo ""
echo "🎉 Git repository initialized successfully!"
echo ""
echo "📋 Next steps to upload to GitHub:"
echo ""
echo "1️⃣  Create a new repository on GitHub:"
echo "   - Go to https://github.com/new"
echo "   - Repository name: quran-website"
echo "   - Description: وب سایت جامع قرآن کریم با امکانات کامل"
echo "   - Make it Public"
echo "   - Don't initialize with README (we already have one)"
echo ""
echo "2️⃣  Connect your local repository to GitHub:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/quran-website.git"
echo ""
echo "3️⃣  Push your code to GitHub:"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "4️⃣  Enable GitHub Pages (optional):"
echo "   - Go to your repository settings"
echo "   - Scroll to 'Pages' section"
echo "   - Source: Deploy from a branch"
echo "   - Branch: main"
echo "   - Your site will be available at:"
echo "   - https://YOUR_USERNAME.github.io/quran-website"
echo ""
echo "📝 Replace 'YOUR_USERNAME' with your GitHub username"
echo ""
echo "🔗 Useful commands:"
echo "   git status          # Check repository status"
echo "   git log             # View commit history"
echo "   git add .           # Add new changes"
echo "   git commit -m 'message'  # Commit changes"
echo "   git push            # Push to GitHub"
echo ""
echo "✨ Your beautiful Quran website is ready for GitHub!"
echo "🌙 May Allah bless your efforts"
echo ""
echo "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ"