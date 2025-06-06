# React Snake Game 🐍

A modern implementation of the classic Snake game built with React, TypeScript, and Vite. This project features a responsive design, multiple difficulty levels, and smooth animations.

![Snake Game Screenshot](screenshot.png)

## ✨ Features

- 🎮 Classic Snake gameplay with modern UI
- 🎯 Multiple difficulty levels (Easy, Medium, Hard)
- 🏆 High score tracking with local storage
- ⏯️ Pause functionality
- 🎨 Smooth animations and particle effects
- 📱 Responsive design that works on all screen sizes
- ⌨️ Keyboard controls
- 🎯 Visual feedback for game events

## 🛠️ Technologies Used

- [React 19](https://reactjs.org/) - UI Library
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Vite](https://vitejs.dev/) - Build Tool
- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS) - Styling
  - CSS Grid for game board
  - Flexbox for layouts
  - CSS Animations for effects
  - CSS Variables for theming

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/react-snake.git
   cd react-snake
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
yarn build
```

The build files will be in the `dist` directory.

## 🎯 How to Play

1. Select a difficulty level from the main menu:

   - Easy: 200ms movement speed
   - Medium: 150ms movement speed
   - Hard: 100ms movement speed

2. Use the arrow keys to control the snake:

   - ↑ Move Up
   - ↓ Move Down
   - ← Move Left
   - → Move Right

3. Press 'P' to pause the game

4. Try to eat the food (red dots) to grow the snake and increase your score

5. Avoid hitting the walls or the snake's own body

## 📁 Project Structure

```
react-snake/
├── src/
│   ├── components/          # React components
│   │   ├── Board.tsx       # Game board component
│   │   ├── Board.css       # Board styles
│   │   ├── GameMenu.tsx    # Main menu component
│   │   └── GameMenu.css    # Menu styles
│   ├── App.tsx             # Main game logic
│   ├── App.css             # Global styles
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── dist/                   # Production build
├── node_modules/          # Dependencies
├── package.json           # Project metadata and dependencies
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── README.md              # Project documentation
```

## 🎨 Customization

### Changing Colors

The game's color scheme can be customized by modifying the CSS variables in `src/App.css`:

```css
:root {
	--snake-color: #4caf50;
	--food-color: #ff5252;
	--background-color: #f8f9fa;
	--text-color: #2c3e50;
}
```

### Adjusting Game Speed

Game speeds can be modified in `src/App.tsx`:

```typescript
const DIFFICULTY_SPEEDS = {
	easy: 200, // milliseconds
	medium: 150, // milliseconds
	hard: 100, // milliseconds
};
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Add comments for complex logic
- Update documentation for new features
- Write meaningful commit messages
- Test your changes thoroughly

## 📝 Future Improvements

- [ ] Add sound effects
- [ ] Implement mobile touch controls
- [ ] Add power-ups
- [ ] Create different game modes
- [ ] Add multiplayer support
- [ ] Implement leaderboards
- [ ] Add game statistics
- [ ] Create custom themes
- [ ] Add game tutorials
- [ ] Implement game achievements

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the classic Snake game
- Built with React and TypeScript
- Styled with modern CSS features
- Thanks to all contributors who have helped improve the game

## 📚 Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [CSS Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
