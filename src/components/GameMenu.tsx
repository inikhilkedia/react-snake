import React, { useTransition, useDeferredValue } from 'react';
import './GameMenu.css';

// Props interface for the GameMenu component
interface GameMenuProps {
	onStartGame: (difficulty: 'easy' | 'medium' | 'hard') => void; // Callback to start game with selected difficulty
	highScore: number; // Current high score to display
}

const GameMenu: React.FC<GameMenuProps> = ({ onStartGame, highScore }) => {
	// Use transition for smooth state updates
	const [isPending, startTransition] = useTransition();

	// Deferred value for smooth high score updates
	const deferredHighScore = useDeferredValue(highScore);

	// Handle game start with transition
	const handleStartGame = (difficulty: 'easy' | 'medium' | 'hard') => {
		startTransition(() => {
			onStartGame(difficulty);
		});
	};

	return (
		<div className='game-menu'>
			{/* Game title */}
			<h1>Snake Game 🐍</h1>

			<div className='menu-content'>
				{/* Difficulty selection section */}
				<div className='difficulty-section'>
					<h2>Select Difficulty</h2>
					<div className='difficulty-buttons'>
						{/* Easy difficulty button */}
						<button
							onClick={() => handleStartGame('easy')}
							className='difficulty-btn easy'
							disabled={isPending}
						>
							Easy
							<span className='speed-info'>200ms</span>
						</button>
						{/* Medium difficulty button */}
						<button
							onClick={() => handleStartGame('medium')}
							className='difficulty-btn medium'
							disabled={isPending}
						>
							Medium
							<span className='speed-info'>150ms</span>
						</button>
						{/* Hard difficulty button */}
						<button
							onClick={() => handleStartGame('hard')}
							className='difficulty-btn hard'
							disabled={isPending}
						>
							Hard
							<span className='speed-info'>100ms</span>
						</button>
					</div>
				</div>

				{/* Game controls section */}
				<div className='controls-section'>
					<h2>Controls</h2>
					<div className='controls-info'>
						{/* Up movement control */}
						<div className='control-item'>
							<span className='key'>↑</span>
							<span className='description'>Move Up</span>
						</div>
						{/* Down movement control */}
						<div className='control-item'>
							<span className='key'>↓</span>
							<span className='description'>Move Down</span>
						</div>
						{/* Left movement control */}
						<div className='control-item'>
							<span className='key'>←</span>
							<span className='description'>Move Left</span>
						</div>
						{/* Right movement control */}
						<div className='control-item'>
							<span className='key'>→</span>
							<span className='description'>Move Right</span>
						</div>
						{/* Pause control */}
						<div className='control-item'>
							<span className='key'>P</span>
							<span className='description'>Pause Game</span>
						</div>
					</div>
				</div>

				{/* High score display section */}
				<div className='high-score'>
					<h2>High Score</h2>
					<div className='score'>{deferredHighScore}</div>
				</div>
			</div>
			{isPending && <div className='loading-indicator'>Loading...</div>}
		</div>
	);
};

export default GameMenu;
