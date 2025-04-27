# Stick Hero Game Clone

A simple browser-based clone of the "Stick Hero" game.  
Built with vanilla JavaScript and HTML5 Canvas — no frameworks, no libraries.

## 📄 Topics

- JavaScript
- HTML5 Canvas
- Game Development
- 2D Animation
- Game Physics
- Stick Hero Clone
- Frontend Project

## 📁 Project Structure

```
/
├── main.js           # Game initialization, main loop, event handling
├── Hero.js           # Hero character logic (walk, fall, animate)
├── platform.js       # Platform generation, drawing, and collision detection
├── stick.js          # Stick growth, rotation, and collision
├── index.html        # HTML container (you should have it)
├── assets/imgs/      # Spritesheet and images
└── style.css         # Basic CSS (optional but recommended)
```

## 🛠️ How to Run

1. Clone the repository.
2. Make sure you have an `index.html` that links to `main.js`.
3. Open `index.html` in any modern browser.

```bash
git clone https://github.com/your-username/stick-hero-clone.git
cd stick-hero-clone
# Open index.html
```

## 🕹️ How to Play

- **Click and hold** to grow the stick.
- **Release** to let the stick fall across to the next platform.
- If the stick is too short or too long, the hero will fall.
- Reach the middle of the platform for extra rewards (you can expand logic).

## 📢 Notes

- Game uses **Canvas 2D API** only.
- Fully responsive scaling using **ResizeObserver**.
- No external libraries (pure JavaScript and Canvas).

## 📝 License

This project is for **learning and practice** purposes.  
Feel free to fork, modify, and improve it!

---

**Made with ❤️ by a student for training and portfolio building.**
