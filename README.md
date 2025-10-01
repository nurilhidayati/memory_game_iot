# 🎮 IoT Products Memory Game

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Deploy to GitHub Pages](https://github.com/yourusername/iot-memory-game/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)](https://github.com/yourusername/iot-memory-game/actions)

A fun and engaging memory matching game featuring IoT products. Test your memory skills by matching pairs of IoT device cards within the time limit!

## 🚀 How to Run Locally

### Option 1: Using Node.js (Recommended)
1. **Install Node.js** (if not already installed):
   - Download from [nodejs.org](https://nodejs.org/)
   - Or install via package manager (Chocolatey, Homebrew, etc.)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```
   This will open the game in your browser at `http://localhost:3000`

### Option 2: Using Python (Alternative)
If you don't have Node.js installed, you can use Python:

```bash
# Python 3
python -m http.server 8000

# Or Python 2
python -m SimpleHTTPServer 8000
```
Then open `http://localhost:8000` in your browser.

### Option 3: Direct File Opening
Simply open `index.html` directly in your web browser (some features might not work due to CORS restrictions).

## 🌐 Deploy to GitHub Pages

### Step 1: Prepare Your Repository
1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: IoT Memory Game"
   ```

2. **Create GitHub Repository**:
   - Go to [GitHub](https://github.com) and create a new repository
   - Name it `iot-memory-game` (or any name you prefer)

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/yourusername/iot-memory-game.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. The workflow will automatically deploy your site

### Step 3: Access Your Live Site
Your game will be available at:
`https://yourusername.github.io/iot-memory-game`

## 🎯 Game Features

- **18 Cards Total**: 6 unique IoT products, each appearing 3 times
- **30-Second Timer**: Race against time to match all pairs
- **Responsive Design**: Works on desktop and mobile devices
- **Smooth Animations**: Card flipping and matching animations
- **Win/Lose Conditions**: Clear feedback when you win or run out of time

## 🛠️ Customization

### Adding New IoT Products
1. Add your image files to the `img/` folder
2. Update the `cardsArray` in `js/script.original.js`:
   ```javascript
   const cardsArray = [{
     'name': 'your-product-name',
     'img': 'img/your-image.png'
   }, {
     // ... existing cards
   }];
   ```
3. Update `maxMatches` variable to match the new number of pairs

### Styling
- Modify `css/style.css` for visual changes
- The game uses CSS Grid for responsive layout
- Card dimensions and animations can be adjusted in the CSS

## 📁 Project Structure

```
iot-memory-game/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── css/
│   ├── style.css              # Main stylesheet
│   └── style.prefix.css       # Prefixed stylesheet
├── img/                       # Game images
│   ├── foodlocker.png
│   ├── kartacam1.png
│   ├── kartacam2.png
│   ├── kartacam360.png
│   ├── kartadashcam1.png
│   ├── kartadashcam2.png
│   └── question.png
├── js/
│   ├── script.original.js     # Original JavaScript
│   └── script.babel.js        # Babel-compiled JavaScript
├── index.html                 # Main HTML file
├── package.json              # Node.js dependencies
├── vercel.json               # Vercel deployment config
└── README.md                 # This file
```

## 🐛 Troubleshooting

### Common Issues:

1. **"npm is not recognized"**: Install Node.js from [nodejs.org](https://nodejs.org/)

2. **Images not loading**: Make sure all image files are in the `img/` folder and paths are correct

3. **GitHub Pages not updating**: 
   - Check if the workflow ran successfully in the Actions tab
   - Ensure your repository is public (for free GitHub Pages)
   - Wait a few minutes for changes to propagate

4. **CORS errors**: Use a local server (npm start or Python server) instead of opening HTML directly

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

---

**Enjoy playing the IoT Memory Game! 🎮**